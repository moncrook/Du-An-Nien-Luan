const request = require('supertest');
const app = require('../app');
const db = require('../utils/index');

// Giả lập (Mock) hoàn toàn module database để không ghi dữ liệu thật vào MySQL
jest.mock('../utils/index', () => ({
  querySql: jest.fn(),
  queryOne: jest.fn()
}));

describe('Test các API xác thực Người dùng (User APIs)', () => {
  
  beforeEach(() => {
    // Reset lại các mock sau mỗi ca test
    jest.clearAllMocks();
  });

  // 1. Test trường hợp Đăng ký thành công
  test('POST /api/register - Nên đăng ký tài khoản thành công', async () => {
    // Giả lập hành vi: findUser trả về null (nghĩa là user chưa tồn tại)
    db.queryOne.mockResolvedValue(null); 
    
    // Giả lập hành vi: Insert thành công trả về kết quả hợp lệ
    db.querySql.mockResolvedValueOnce([{ affectedRows: 1 }]); // cho câu lệnh insert
    db.querySql.mockResolvedValueOnce([{ id: 1, username: 'testuser', nickname: 'Test' }]); // cho câu lệnh select user sau khi insert

    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.code).toBe(0); // CODE_SUCCESS
    expect(res.body.msg).toBe('注册成功'); // "Đăng ký thành công" trong code backend của bạn
    expect(res.body.data).toHaveProperty('token');
  });

  // 2. Test trường hợp Đăng ký thất bại do tài khoản đã tồn tại
  test('POST /api/register - Nên thất bại nếu tài khoản đã tồn tại', async () => {
    // Giả lập: findUser tìm thấy user trùng lặp
    db.queryOne.mockResolvedValue({ id: 1, username: 'testuser' });

    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.code).toBe(-1); // CODE_ERROR
    expect(res.body.msg).toBe('用户已存在'); // "Người dùng đã tồn tại"
  });

  // 3. Test trường hợp Đăng nhập thành công
  test('POST /api/login - Nên đăng nhập thành công và trả về token', async () => {
    // Giả lập: Tìm thấy user khớp với tài khoản mật khẩu trong DB
    db.querySql.mockResolvedValue([{ id: 1, username: 'testuser', nickname: 'Test' }]);

    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.code).toBe(0);
    expect(res.body.data).toHaveProperty('token');
  });
});
/**
 * 描述: jwt-token验证和解析函数
 * 作者: Jack Chen
 * 日期: 2020-06-20
*/

const jwt = require('jsonwebtoken'); // Nhập mô-đun xác thực jsonwebtoken
const { expressjwt: expressJwt } = require('express-jwt'); // Destructure expressjwt theo chuẩn v7/v8
const { PRIVATE_KEY } = require('./constant'); // Nhập khóa bí mật JWT tự định nghĩa

// Xác thực token xem có hợp lệ hoặc đã hết hạn chưa
const jwtAuth = expressJwt({
  // Cấu hình khóa bí mật
  secret: PRIVATE_KEY,
  // BẮT BUỘC TỪ V7+: Khai báo thuật toán mã hóa (mặc định JWT dùng HS256)
  algorithms: ['HS256'],
  // Đặt giá trị true để bật kiểm tra token, false để tắt kiểm tra
  credentialsRequired: true,
  // Hàm tùy chỉnh để trích xuất token từ request gửi lên
  getToken: (req) => {
    if (req.headers.authorization) {
      // Xử lý chuỗi token (Cắt bỏ tiền tố 'Bearer ' nếu có)
      if (req.headers.authorization.startsWith('Bearer ')) {
        return req.headers.authorization.split(' ')[1];
      }
      return req.headers.authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
  // Danh sách trắng (Whitelist) không yêu cầu xác thực JWT
}).unless({
  path: [
    '/',
    '/api/login',
    '/api/register',
    '/api/resetPwd'
  ]
});

// Giải mã và lấy dữ liệu từ jwt-token
function decode(req) {
  let token = req.get('Authorization');
  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }
  return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
  jwtAuth,
  decode
};
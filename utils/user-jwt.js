/**
 * 描述: jwt-token验证和解析函数
 * 作者: Jack Chen
 * 日期: 2020-06-20
*/

const jwt = require('jsonwebtoken'); // Nhập mô-đun xác thực jsonwebtoken
const expressJwt = require('express-jwt'); // Nhập mô-đun middleware express-jwt
const { PRIVATE_KEY } = require('./constant'); // Nhập khóa bí mật JWT tự định nghĩa

// Xác thực token xem có hợp lệ hoặc đã hết hạn chưa
const jwtAuth = expressJwt({
  // Cấu hình khóa bí mật
  secret: PRIVATE_KEY,
  // Đặt giá trị true để bật kiểm tra token, false để tắt kiểm tra
  credentialsRequired: true,
  // Hàm tùy chỉnh để trích xuất token từ request gửi lên
  getToken: (req) => {
    if (req.headers.authorization) {
      return req.headers.authorization
    } else if (req.query && req.query.token) {
      return req.query.token
    }
  }
  // Danh sách trắng (Whitelist) không yêu cầu xác thực JWT (Ví dụ: Đăng nhập, Đăng ký)
}).unless({
  path: [
    '/',
    '/api/login',
    '/api/register',
    '/api/resetPwd'
  ]
})

// Giải mã và lấy dữ liệu từ jwt-token
function decode(req) {
  const token = req.get('Authorization')
  return jwt.verify(token, PRIVATE_KEY);
}
module.exports = {
  jwtAuth,
  decode
}

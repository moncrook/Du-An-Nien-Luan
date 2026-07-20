/**
 * 描述: 自定义常量
 * 作者: Jack Chen
 * 日期: 2020-06-20
*/


module.exports = {
  CODE_ERROR: -1,             // Mã code khi phản hồi yêu cầu thất bại
  CODE_SUCCESS: 0,            // Mã code khi phản hồi yêu cầu thành công
  CODE_TOKEN_EXPIRED: 401,    // Mã lỗi ủy quyền / xác thực thất bại
  PRIVATE_KEY: 'jackchen',    // Khóa bí mật (Private key) dùng để mã hóa JWT
  JWT_EXPIRED: 60 * 60 * 24,  // Thời gian hết hạn của token (24 giờ)
}
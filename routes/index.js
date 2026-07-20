/**
 * 描述: 初始化路由信息，自定义全局异常处理
 * 作者: Jack Chen
 * 日期: 2020-06-19
*/

const express = require('express');
// const boom = require('boom'); // 引入boom模块，处理程序异常状态
const userRouter = require('./users'); // Nhập mô-đun route người dùng
const taskRouter = require('./tasks'); // Nhập mô-đun route nhiệm vụ
const { jwtAuth } = require('../utils/user-jwt'); // Nhập hàm xác thực JWT
const router = express.Router(); // Đăng ký router 

router.use(jwtAuth); // Tích hợp mô-đun xác thực JWT

router.use('/api', userRouter); // Tích hợp route người dùng
router.use('/api', taskRouter); // Tích hợp route nhiệm vụ

// Middleware xử lý lỗi tập trung tùy chỉnh, bắt buộc phải đặt ở cuối cùng của file
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  // Xử lý phản hồi lỗi khi xác thực người dùng thất bại
  console.log('err===', err);
  if (err && err.name === 'UnauthorizedError') {
    const { status = 401 } = err;
    // Báo lỗi ngoại lệ 401
    res.status(status).json({
      code: status,
      msg: 'Token đã hết hạn hoặc không hợp lệ, vui lòng đăng nhập lại',
      data: null
    })
  } else {
    const { output } = err || {};
    // Mã lỗi và thông báo lỗi
    const errCode = (output && output.statusCode) || 500;
    const errMsg = (output && output.payload && output.payload.error) || err.message;
    res.status(errCode).json({
      code: errCode,
      msg: errMsg
    })
  }
})

module.exports = router;
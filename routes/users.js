

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const service = require('../services/userService');


// Validate dữ liệu Đăng nhập / Đăng ký
const vaildator = [
  body('username').isString().withMessage('Tên đăng nhập phải là chuỗi'),
  body('password').isString().withMessage('Mật khẩu phải là chuỗi')
]

// Validate dữ liệu Đặt lại mật khẩu
const resetPwdVaildator = [
  body('username').isString().withMessage('Tên đăng nhập phải là chuỗi'),
  body('oldPassword').isString().withMessage('Mật khẩu cũ phải là chuỗi'),
  body('newPassword').isString().withMessage('Mật khẩu mới phải là chuỗi')
]

// Route Đăng nhập người dùng
router.post('/login', vaildator, service.login);

// Route Đăng ký người dùng
router.post('/register', vaildator, service.register);

// Route Đặt lại / Đổi mật khẩu
router.post('/resetPwd', resetPwdVaildator, service.resetPwd);

module.exports = router;


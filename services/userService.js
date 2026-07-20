/**
 * 描述: 业务逻辑处理 - 用户相关接口
 * 作者: Jack Chen
 * 日期: 2020-06-20
*/


const { querySql, queryOne } = require('../utils/index');
const md5 = require('../utils/md5');
const jwt = require('jsonwebtoken');
const boom = require('boom');
const { body, validationResult } = require('express-validator');
const { 
  CODE_ERROR,
  CODE_SUCCESS, 
  PRIVATE_KEY, 
  JWT_EXPIRED 
} = require('../utils/constant');
const { decode } = require('../utils/user-jwt');

// Đăng nhập
function login(req, res, next) {
  const err = validationResult(req);
  // Nếu có lỗi validate, err.isEmpty() sẽ trả về false
  if (!err.isEmpty()) {
    // Lấy thông báo lỗi
    const [{ msg }] = err.errors;
    // Chuyển lỗi sang middleware xử lý ngoại lệ tập trung
    next(boom.badRequest(msg));
  } else {
    let { username, password } = req.body;
    // Mã hóa MD5 mật khẩu
    password = md5(password);
    const query = `select * from sys_user where username='${username}' and password='${password}'`;
    querySql(query)
    .then(user => {
      // console.log('Đăng nhập người dùng===', user);
      if (!user || user.length === 0) {
        res.json({ 
          code: CODE_ERROR, 
          msg: 'Tên đăng nhập hoặc mật khẩu không chính xác', 
          data: null 
        })
      } else {
        // Đăng nhập thành công, cấp phát token và trả về cho phía frontend
        const token = jwt.sign(
          // payload: Dữ liệu cần lưu trong token
          { username },
          // Chìa khóa bảo mật (Private Key)
          PRIVATE_KEY,
          // Cấu hình thời gian hết hạn
          { expiresIn: JWT_EXPIRED }
        )

        let userData = {
          id: user[0].id,
          username: user[0].username,
          nickname: user[0].nickname,
          avator: user[0].avator,
          sex: user[0].sex,
          gmt_create: user[0].gmt_create,
          gmt_modify: user[0].gmt_modify
        };

        res.json({ 
          code: CODE_SUCCESS, 
          msg: 'Đăng nhập thành công', 
          data: { 
            token,
            userData
          } 
        })
      }
    })
  }
}


// Đăng ký
function register(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { username, password } = req.body;
    findUser(username)
    .then(data => {
      // console.log('Đăng ký người dùng===', data);
      if (data) {
        res.json({ 
          code: CODE_ERROR, 
          msg: 'Tên người dùng đã tồn tại', 
          data: null 
        })
      } else {
        password = md5(password);
        const query = `insert into sys_user(username, password) values('${username}', '${password}')`;
        querySql(query)
        .then(result => {
          // console.log('Đăng ký người dùng===', result);
          if (!result || result.length === 0) {
            res.json({ 
              code: CODE_ERROR, 
              msg: 'Đăng ký thất bại', 
              data: null 
            })
          } else {
            const queryUser = `select * from sys_user where username='${username}' and password='${password}'`;
            querySql(queryUser)
            .then(user => {
              const token = jwt.sign(
                { username },
                PRIVATE_KEY,
                { expiresIn: JWT_EXPIRED }
              )

              let userData = {
                id: user[0].id,
                username: user[0].username,
                nickname: user[0].nickname,
                avator: user[0].avator,
                sex: user[0].sex,
                gmt_create: user[0].gmt_create,
                gmt_modify: user[0].gmt_modify
              };

              res.json({ 
                code: CODE_SUCCESS, 
                msg: 'Đăng ký thành công', 
                data: { 
                  token,
                  userData
                } 
              })
            })
          }
        })
      }
    })
   
  }
}

// Đặt lại / Đổi mật khẩu
function resetPwd(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.errors;
    next(boom.badRequest(msg));
  } else {
    let { username, oldPassword, newPassword } = req.body;
    oldPassword = md5(oldPassword);
    validateUser(username, oldPassword)
    .then(data => {
      console.log('Xác thực tên đăng nhập và mật khẩu===', data);
      if (data) {
        if (newPassword) {
          newPassword = md5(newPassword);
          const query = `update sys_user set password='${newPassword}' where username='${username}'`;
          querySql(query)
          .then(user => {
            // console.log('Đặt lại mật khẩu===', user);
            if (!user || user.length === 0) {
              res.json({ 
                code: CODE_ERROR, 
                msg: 'Đặt lại mật khẩu thất bại', 
                data: null 
              })
            } else {
              res.json({ 
                code: CODE_SUCCESS, 
                msg: 'Đặt lại mật khẩu thành công', 
                data: null
              })
            }
          })
        } else {
          res.json({ 
            code: CODE_ERROR, 
            msg: 'Mật khẩu mới không được để trống', 
            data: null 
          })
        }
      } else {
        res.json({ 
          code: CODE_ERROR, 
          msg: 'Tên đăng nhập hoặc mật khẩu cũ không chính xác', 
          data: null 
        })
      }
    })
   
  }
}

// Xác thực tên đăng nhập và mật khẩu
function validateUser(username, oldPassword) {
  const query = `select id, username from sys_user where username='${username}' and password='${oldPassword}'`;
  return queryOne(query);
}

// Kiểm tra thông tin người dùng qua tên đăng nhập
function findUser(username) {
  const query = `select id, username from sys_user where username='${username}'`;
  return queryOne(query);
}

module.exports = {
  login,
  register,
  resetPwd
}

/**
 * 描述: 封装md5方法
 * 作者: Jack Chen
 * 日期: 2020-06-20
*/

const crypto = require('crypto'); // Nhập mô-đun mã hóa crypto

function md5(s) {
  return crypto.createHash('md5').update('' + s).digest('hex');
}

module.exports = md5;
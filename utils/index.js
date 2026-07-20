/**
 * 描述: 连接mysql模块
 * 作者: Jack Chen
 * 日期: 2020-06-20
*/


const mysql = require('mysql2');
const config = require('../db/dbConfig');
// Kết nối với cơ sở dữ liệu MySQL
function connect() {
  const { host, user, password, database } = config;
  return mysql.createConnection({
    host,
    user,
    password,
    database
  })
}

// Thực thi câu lệnh truy vấn SQL (Trả về nhiều kết quả / mảng)
function querySql(sql) { 
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    } catch (e) {
      reject(e);
    } finally {
      // Ngắt / Giải phóng kết nối Database
      conn.end();
    }
  })
}

// Thực thi câu lệnh truy vấn trả về duy nhất 1 bản ghi
function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql).then(res => {
      console.log('kết quả===', res)
      if (res && res.length > 0) {
        resolve(res[0]);
      } else {
        resolve(null);
      }
    }).catch(err => {
      reject(err);
    })
  })
}
module.exports = {
  querySql,
  queryOne
}
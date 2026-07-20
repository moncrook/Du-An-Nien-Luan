/**
 * 描述: 入口文件
 * 作者: Jack Chen
 * 日期: 2020-06-12
*/
const bodyParser = require('body-parser'); // Nhập mô-đun body-parser
const express = require('express'); // Nhập mô-đun express
const cors = require('cors'); // Nhập mô-đun cors
const routes = require('./routes'); // Nhập file route tùy chỉnh để tạo route dạng module
const app = express();

app.use(bodyParser.json()); // Cấu hình phân tích dữ liệu dạng JSON
app.use(bodyParser.urlencoded({extended: true})); // Cấu hình phân tích dữ liệu gửi từ form (application/x-www-form-urlencoded)

app.use(cors()); // Tích hợp mô-đun CORS để xử lý lỗi chia sẻ tài nguyên giữa các nguồn khác nhau (Cross-Origin Resource Sharing)

app.use('/', routes);


// app.listen(8088, () => { // 监听8088端口
// 	console.log('服务已启动 http://localhost:8088');
// })

module.exports = app;
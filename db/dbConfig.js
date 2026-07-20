

const mysql = {
    host: 'localhost',      // Tên host / Tên máy chủ (thường là localhost trên máy cá nhân)
    port: '3306',           // Cổng kết nối MySQL (mặc định là 3306)
    user: 'root',           // Tên tài khoản kết nối Database
    password: 'nhan250725', // Mật khẩu tài khoản Database
    database: 'my_test',    // Tên cơ sở dữ liệu kết nối
    connectTimeout: 5000    // Thời gian chờ kết nối tối đa (5000ms = 5 giây)
}

// "test": "echo \"Error: no test specified\" && exit 1"
module.exports = mysql;
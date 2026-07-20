# Lời mở đầu
Dự án phát triển API Backend Fullstack bằng Node.js dựa trên Node.js + Express + MySQL để xây dựng các RESTful API. Các giao diện/API bao gồm: Đăng nhập, Đăng ký, Ghi nhớ mật khẩu, Đổi mật khẩu, Đăng xuất, Thêm/Xóa/Sửa/Xem (CRUD) danh sách công việc (todoList), Lọc điều kiện tìm kiếm, Đánh dấu sao yêu thích/quan trọng... Mặc dù kịch bản dự án khá đơn giản nhưng các chức năng lại rất đầy đủ, cực kỳ phù hợp cho các bạn mới bắt đầu học phát triển Fullstack. Nếu thấy dự án hữu ích, hy vọng bạn có thể thả cho mình 1 nút ❤️ **Star**, rất mong được giao lưu và học hỏi cùng mọi người!

[Xem DEMO trực tuyến](http://106.55.168.13:8082/)

[NodeJS全栈开发一个功能完善的Express项目实战分享](https://juejin.im/post/6844904198551666701)


# Giới thiệu
Dự án phát triển API Backend Fullstack sử dụng Node.js + Express + MySQL để xây dựng RESTful API. Các chức năng chính bao gồm: Đăng nhập, Đăng ký, Ghi nhớ mật khẩu, Đổi mật khẩu, Đăng xuất, CRUD (Thêm, Xóa, Sửa, Xem) danh sách TodoList, Lọc theo điều kiện tìm kiếm, Đánh dấu sao yêu thích (Flag)... Tuy kịch bản ứng dụng đơn giản nhưng tích hợp khá đầy đủ các chức năng cơ bản, rất phù hợp cho các bạn mới bắt đầu học lập trình Fullstack.

---

# Cấu trúc thư mục
```text
│  app.js                         // File khởi chạy ứng dụng (Entry point)
│  ecosystem.config.js            // File cấu hình mặc định cho PM2
│  package.json                   // Quản lý dependencies và thông tin cấu hình dự án
├─db
│      dbConfig.js                // Cấu hình kết nối cơ sở dữ liệu MySQL
├─routes
│      index.js                   // Khởi tạo các tuyến đường (routes) & xử lý ngoại lệ toàn cục
│      tasks.js                   // Route xử lý các chức năng liên quan đến công việc (Tasks)
│      users.js                   // Route xử lý các chức năng liên quan đến người dùng (Users)
├─services
│      taskService.js             // Xử lý logic nghiệp vụ - Các API nhiệm vụ (Tasks)
│      userService.js             // Xử lý logic nghiệp vụ - Các API người dùng (Users)
└─utils
        constant.js               // Định nghĩa các hằng số dùng chung
        index.js                  // Mã hóa mô-đun kết nối MySQL
        md5.js                    // Hàm mã hóa MD5 ở phía Backend
        user-jwt.js               // Các hàm xác thực và giải mã JWT Token
```


# Công nghệ sử dụng
 * NodeJS v10
 * express
 * mysql v5.7
 * jwt
 * nodemon
 * cors
 * boom
 * pm2
 
# Các tính năng chính
* Đăng nhập / Đăng xuất
* Đăng ký tài khoản
* Ghi nhớ mật khẩu
* Thay đổi mật khẩu
* Quản lý Todo (Thêm, Xóa, Sửa, Tìm kiếm - CRUD)
* Đánh dấu sao yêu thích / Quan trọng
* Bộ lọc danh sách theo điều kiện

# Tải về và cài đặt thư viện
```bash
git clone [https://github.com/moncrook/du-an-nien-luan.git](https://github.com/moncrook/du-an-nien-luan.git)
cd du-an-nien-luan
npm install # hoặc yarn install

## Cài đặt MySQL
Vui lòng tham khảo bài viết hướng dẫn chi tiết tại blog: Những điều cần biết về MySQL cho Frontend - Con đường trở thành Fullstack Node.js: https://juejin.im/post/5ee6010ef265da76d3188ea8


## Chế độ Phát triển (Development)
```
npm start
```
Sau khi khởi chạy, truy cập đường dẫn: http://localhost:8088


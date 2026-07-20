# 1. Dùng base image Node.js lightweight
FROM node:18-alpine

# 2. Tạo thư mục làm việc trong container
WORKDIR /app

# 3. Copy file package.json và package-lock.json
COPY package*.json ./

# 4. Cài đặt thư viện cho môi trường Production
RUN npm ci --only=production

# 5. Copy toàn bộ mã nguồn vào container
COPY . .

# 6. Khai báo port ứng dụng chạy
EXPOSE 3000

# 7. Lệnh khởi chạy ứng dụng
CMD ["node", "app.js"]
FROM node:20-slim

# Cập nhật hệ thống và vá các lỗ hổng OS
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy hai file package
COPY package*.json ./

# Dùng 'npm ci --omit=dev' để chỉ cài đặt các thư viện Production
RUN npm ci --only=production --no-cache

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
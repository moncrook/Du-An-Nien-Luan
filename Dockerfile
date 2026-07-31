FROM node:20-slim

# Cập nhật hệ thống và vá các lỗ hổng OS
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

ARG REFRESHED_AT=2026-07-31

WORKDIR /app

# Copy hai file package
COPY package*.json ./

RUN cat package-lock.json | grep tar

# Dùng 'npm ci --omit=dev' để chỉ cài đặt các thư viện Production
RUN npm ci --only=production --no-cache

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
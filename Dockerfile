FROM node:18-alpine

# Cập nhật OS Alpine
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copy hai file package
COPY package*.json ./

# Dùng 'npm ci --omit=dev' để chỉ cài đặt các thư viện Production
RUN npm ci --omit=dev --no-cache

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
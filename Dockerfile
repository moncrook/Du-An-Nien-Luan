FROM node:20-alpine

# Cập nhật package của Alpine
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copy package files trước để tận dụng Docker layer cache
COPY package*.json ./

# Chỉ cài production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy source code
COPY . .

# Ứng dụng chạy port 3000
EXPOSE 3000

CMD ["npm", "start"]
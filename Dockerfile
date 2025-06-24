# Build source code
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Server build folder dengan Nginx
FROM nginx:alpine

# Copy hasil build ke dalam folder nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

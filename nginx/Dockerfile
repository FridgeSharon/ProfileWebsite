# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY frontend/package*.json ./frontend/

RUN npm ci --workspace=frontend

COPY frontend/ ./frontend/

# Build Angular SPA in production mode with high old space memory
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build --workspace=frontend

# Production Stage
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular static bundle to Nginx html folder
COPY --from=builder /app/frontend/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

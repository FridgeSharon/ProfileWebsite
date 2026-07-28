# Build Stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root monorepo files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm ci --workspace=backend

# Copy backend source code
COPY backend/ ./backend/

# Build backend application
RUN npm run build --workspace=backend

# Production Stage
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY backend/package*.json ./backend/

# Install production dependencies only (including sqlite runtime)
RUN npm ci --workspace=backend --only=production

# Copy compiled dist and initial data from builder
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/data ./backend/data

# Create directory for persistent SQLite storage
RUN mkdir -p /app/backend/data

EXPOSE 3000

CMD ["node", "backend/dist/main"]

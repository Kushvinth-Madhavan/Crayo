# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with specific npm config
RUN npm config set legacy-peer-deps true && \
    npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm config set legacy-peer-deps true && \
    npm install --frozen-lockfile --production

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Set environment to production
ENV NODE_ENV=production
ENV PORT=8080

# Expose the port (Google Cloud Run uses PORT env variable)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
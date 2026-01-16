# Build stage
FROM node:20-alpine AS builder

# Accept build arguments from Coolify
ARG COOLIFY_URL
ARG COOLIFY_FQDN
ARG COOLIFY_BUILD_SECRETS_HASH

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Accept build arguments (for consistency, though not used in this stage)
ARG COOLIFY_URL
ARG COOLIFY_FQDN
ARG COOLIFY_BUILD_SECRETS_HASH

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

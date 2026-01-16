# Docker Deployment Guide

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The website will be available at: `http://localhost:80` or `http://localhost:8080`

### Using Docker Directly

```bash
# Build the image
docker build -t ai-vision-website .

# Run the container
docker run -d -p 80:80 --name ai-vision-website ai-vision-website

# View logs
docker logs -f ai-vision-website

# Stop the container
docker stop ai-vision-website
docker rm ai-vision-website
```

## Production Deployment

### Build for Production

```bash
docker build -t ai-vision-website:latest .
```

### Run with Custom Port

```bash
docker run -d -p 3000:80 --name ai-vision-website ai-vision-website:latest
```

### Environment Variables

The container runs in production mode by default. No environment variables are required for basic operation.

## Docker Image Details

- **Base Image**: `nginx:alpine` (lightweight, ~23MB)
- **Build Image**: `node:20-alpine` (for building)
- **Port**: 80 (configurable)
- **Health Check**: Enabled (checks every 30s)

## Multi-stage Build

The Dockerfile uses a multi-stage build:
1. **Builder stage**: Installs dependencies and builds the React app
2. **Production stage**: Serves the built files with nginx

This results in a smaller final image (~50MB vs ~500MB+).

## Nginx Configuration

- SPA routing support (all routes serve index.html)
- Gzip compression enabled
- Security headers included
- Static asset caching (1 year)
- Health check endpoint at `/health`

## Troubleshooting

### Container won't start
```bash
docker logs ai-vision-website
```

### Check if container is running
```bash
docker ps
```

### Rebuild after code changes
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Access container shell
```bash
docker exec -it ai-vision-website sh
```

## Deployment Platforms

### Coolify
The `coolify.yml` file is already configured for Coolify deployment.

### Other Platforms
- **Heroku**: Use the Dockerfile with Heroku container registry
- **AWS ECS**: Use the Dockerfile with ECR
- **Google Cloud Run**: Use the Dockerfile
- **DigitalOcean App Platform**: Use the Dockerfile
- **Railway**: Use the Dockerfile

## Health Check

The container includes a health check that verifies nginx is responding:
- Endpoint: `http://localhost/health`
- Returns: `200 OK` with "healthy" message

## Security

The nginx configuration includes:
- X-Frame-Options header
- X-Content-Type-Options header
- X-XSS-Protection header
- Gzip compression for performance

# Coolify Deployment Guide

## Configuration for Coolify Platform

### Docker Compose Location
The platform expects: `/docker-compose.yaml` (note: `.yaml` extension, not `.yml`)

### Required Fields in Coolify:

1. **General Section:**
   - **Name**: `ai-vision-website` (or your preferred name)
   - **Description**: `AI Vision Website with GAPP Demo Integration`
   - **Build Pack**: Select `Docker Compose`

2. **Build Section:**
   - **Base Directory**: `/` (root of repository)
   - **Docker Compose Location**: `/docker-compose.yaml`
   - **Preserve Repository During Deployment**: Unchecked (unless you need it)
   - **Custom Build Command**: `docker compose build` (or leave default)
   - **Custom Start Command**: `docker compose up -d` (or leave default)
   - **Watch Paths**: Leave empty or add `src/**` if you want auto-redeploy on changes

3. **Docker Compose Section:**
   - Click "Load Compose File" button
   - The platform should automatically detect `docker-compose.yaml` in the root
   - Or paste the content from `docker-compose.yaml` into the text area

### Docker Compose File Content

The `docker-compose.yaml` file should contain:

```yaml
version: '3.8'

services:
  ai-vision-website:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ai-vision-website
    ports:
      - "80:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Troubleshooting

**If the compose file doesn't load:**
1. Make sure the file is named `docker-compose.yaml` (not `.yml`)
2. Check that the file is in the root directory of your repository
3. Verify the YAML syntax is correct (no tabs, proper indentation)
4. Try clicking "Load Compose File" button again
5. If still not working, manually paste the content into "Docker Compose Content (raw)" field

**If build fails:**
- Check the "Logs" tab for error messages
- Verify Dockerfile exists in the root
- Ensure package.json and all source files are present

**If deployment fails:**
- Check the "Terminal" tab for runtime errors
- Verify nginx.conf is present
- Check health check endpoint: `/health`

### Quick Checklist

- [ ] `docker-compose.yaml` file exists in root (with .yaml extension)
- [ ] `Dockerfile` exists in root
- [ ] `nginx.conf` exists in root
- [ ] All source files are committed to git
- [ ] Build Pack is set to "Docker Compose"
- [ ] Docker Compose Location is set to `/docker-compose.yaml`

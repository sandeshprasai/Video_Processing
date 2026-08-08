# docker/Dockerfile
FROM node:22-bookworm-slim

# Install FFmpeg and curl (for health checks)
RUN apt-get update && \
    apt-get install -y ffmpeg curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./
# Copy prisma schema so we can generate the client
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma Client (Crucial for Docker)
RUN npx prisma generate

# Copy the rest of the source
COPY . .

EXPOSE 3000

# Default command (overridden by docker-compose)
CMD ["npm", "run", "dev"]
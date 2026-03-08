# Stage 1: Install dependencies
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Stage 2: Run with distroless (minimal attack surface, regularly patched by Google)
FROM gcr.io/distroless/nodejs20-debian12

# Create and change to the app directory
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy local code to the container image
COPY . .

# Cloud Run injects PORT env variable
ENV PORT=8080

# Run the web service on container startup
CMD ["index.js"]

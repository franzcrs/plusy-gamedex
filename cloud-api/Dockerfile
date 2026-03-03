# Use official lightweight Node.js image
FROM node:20-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
# Use package.json only; yarn.lock will be generated if not present
COPY package.json ./
RUN npm install --omit=dev

# Copy local code to the container image
COPY . .

# Cloud Run injects PORT env variable
ENV PORT=8080

# Run the web service on container startup
CMD ["node", "index.js"]

# Use official lightweight Node.js image
FROM node:20-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies using Yarn
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copy local code to the container image
COPY . .

# Cloud Run injects PORT env variable
ENV PORT=8080

# Run the web service on container startup
CMD ["node", "index.js"]

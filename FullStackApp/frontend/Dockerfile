# Use the official Node.js LTS version as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port Vite uses by default
EXPOSE 5173

# Command to run the application in development mode
CMD ["npm", "run", "dev"]

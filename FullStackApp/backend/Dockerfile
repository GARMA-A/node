# Use the official Node.js LTS (Long Term Support) version as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (default for Express is 3000, adjust if needed)
EXPOSE 8080

# Command to run the application in development mode
CMD ["npm", "run", "dev"]

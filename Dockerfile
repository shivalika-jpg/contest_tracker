# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose the port your app listens on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]

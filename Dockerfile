# Use a Node.js image to build the application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifest files to leverage Docker cache
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy all application source code
COPY . .

# Build the React application for production
RUN npm run build

# Use a lightweight Nginx image to serve the static files
FROM nginx:stable-alpine

# Copy the built static files from the 'build' stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to allow external access to the Nginx server
EXPOSE 80

# Command to start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]

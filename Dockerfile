# Use node:20.8.0-alpine as base image for building the application
FROM node:20.8.0-alpine3.18 as builder

# Install dependencies
RUN apk --no-cache add tzdata \
    && apk add --no-cache ca-certificates

# Install dotenv-cli and make
RUN npm install -g dotenv-cli
RUN npm install -g npm@next

# Create a new directory and set it as the working directory
WORKDIR /project

# Copy node application dependency files
COPY package*.json ./

# Download Node application module dependencies
RUN npm ci --quiet --silent --no-optional --max-sockets=4

# Copy actual source code for building the application
COPY . .

# Build the Node.js app
RUN npm run build

COPY /src/assets dist/assets/

# Set the timezone
ENV TZ=Asia/Ho_Chi_Minh

ENV RUNTIME_ENV=local

# Run the binary application
ENTRYPOINT dotenv -e ./env/${RUNTIME_ENV}.env -- npm run start

# Expose the port
EXPOSE 8080

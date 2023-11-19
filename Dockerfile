##### Stage 1 #####

# Use node:20.8.0-alpine as base image for building the application
FROM node:20.8.0-alpine3.18 as builder

# Install dependencies
RUN apk --no-cache add tzdata \
    && apk add --no-cache ca-certificates

# Create a new directory and set it as the working directory
WORKDIR /project

# Copy node application dependency files
COPY package*.json ./

# Download Node application module dependencies
RUN npm ci --quiet --silent --no-optional --max-sockets=4

# Copy actual source code for building the application
COPY . .

# Disable CGO for cross-platform builds
ENV CGO_ENABLED=0

# Build the Node.js app for a Linux OS
RUN npm run build

##### Stage 2 #####

# Define the running image
FROM node:20.8.0-alpine3.18 as prod

# Set working directory
WORKDIR /release

# Install dotenv-cli and make
RUN npm install -g dotenv-cli \
    && apk add --no-cache make

# Copy built binary application from 'builder' image
COPY --from=builder /project/dist dist/
COPY --from=builder /project/src/views src/views/
COPY --from=builder /project/src/assets dist/assets/
COPY --from=builder /project/env env/
COPY --from=builder /project/prisma prisma/
COPY --from=builder /project/package.json .
COPY --from=builder /project/Makefile .

# Copy node_modules directory from 'builder' image
COPY --from=builder /project/node_modules /node_modules

# Generate SSL for Prisma Connection
RUN npx prisma generate

# Copy the ca-certificate.crt from the build stage
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Set the timezone
ENV TZ=Asia/Ho_Chi_Minh

ENV RUNTIME_ENV=local

# Run the binary application
CMD ["dotenv", "-e", "/env/prod.env", "--", "npm", "run", "start"]
ENTRYPOINT  make start env=${RUNTIME_ENV}

# Expose the port
EXPOSE 8080

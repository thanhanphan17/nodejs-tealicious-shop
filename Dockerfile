##### Stage 1 #####

### Use node:20.8.0-alpine as base image for building the application
FROM node:20.8.0-alpine as builder

RUN apk --no-cache add tzdata
# CERT PACKAGES
RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
    ca-certificates \
    && update-ca-certificates 2>/dev/null || true 

### Create new directly and set it as working directory
RUN mkdir -p /project
WORKDIR /project

### Copy node application dependency files
COPY package.json .

### Download Go application module dependencies
RUN npm install

### Copy actual source code for building the application
COPY . .

### CGO has to be disabled cross platform builds
### Otherwise the application won't be able to start
ENV CGO_ENABLED=0

### Build the Go app for a linux OS
RUN GOOS=linux npm run build

##### Stage 2 #####

### Define the running image
FROM node:20.8.0-alpine 

### Set working directory
WORKDIR /release

### Install dotenv-cli
RUN npm install -g dotenv-cli

### Install make
RUN apk add --no-cache make

### Copy built binary application from 'builder' image
COPY --from=builder /project/dist dist/
COPY --from=builder /project/env env/
COPY --from=builder /project/prisma prisma/
COPY --from=builder /project/package.json .
COPY --from=builder /project/Makefile .

### Copy node_modules directory from 'builder' image
COPY --from=builder /project/node_modules /node_modules

### Generate SSL for Prisma Connection
RUN npx prisma generate

# Copy the ca-certificate.crt from the build stage
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

ENV TZ=Asia/Ho_Chi_Minh

### Run the binary application
# CMD ["dotenv", "-e", "/env/prod.env", "--", "npm", "run", "start"]
CMD [ "make", "start", "env=prod" ]
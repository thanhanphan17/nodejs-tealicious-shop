<h1>DEPLOYMENT DOCUMENT</h1>

### Prequisites

-   The majority of the system and software utilized in our project for deploying production to the internet operate on Docker within the same network.
-   Before launching the application, you need to establish a Docker network according to the following specifications.

```
    docker network create tealicious_network
```

### Deployment process with CI/CD

![Alt text](deployment.png)

-   Initially, developers push their code to the developer branch. Subsequently, we review the code and merge it into the staging branch. If everything functions as intended, we proceed to merge it into the master branch, initiating the deployment process.

-   Jenkins monitors our GitHub repository every minute. If any changes are detected in the master branch, Jenkins fetches the new code, builds the Docker image, and upon successful completion, it delivers the image to Docker Hub.

-   Following the successful packaging and pushing of the image, the subsequent step involves pulling the image from Docker Hub and executing it on the Raspberry Pi 4 server.

-   Our server lacks permission to be publicly accessible on the internet due to NAT port restrictions. Since I don't have administrative access to the router Wi-Fi, I've opted to use Cloudflare as a tunnel to publish my site on the internet. Cloudflare also functions as a reverse proxy in our system.

-   Now our deployment process is complete!

### I. Preparing database

#### 1. PosgresSQL

Our team employs PostgreSQL as the primary database to store comprehensive information for the entire system, including tables related to `user`, `product`, `order` and others.
Docker is utilized for deploying PostgreSQL in our system.

```
	@docker run \
		--name postgres-db \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=0000 \
		-e POSTGRES_DB=tealicious_db \
		-v ./.tealicious-volume:/var/lib/postgresql/data \
		-p 5432:5432 -it \
		-d --restart unless-stopped postgres:latest
```

-   You can also run with predefine make file

```
        make init_db
```

#### 2. MongoDB

-   The mongoDB is used to JWT key using RSA algorithm
-   In the production of `yentranquan.shop` we use Mongo Atlas provided by `mongodb.com`

### II. Install Jenkins by Docker for CI/CD pipeline

```
    docker run -u 0 \
    --privileged --name jenkins \
    --restart unless-stopped \
    --network tealicious_network \
    -d -p 8080:8080 -p 50000:50000 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v $(which docker):/usr/bin/docker \
    -v ~/.jenkins_home:/var/jenkins_home \
    jenkins/jenkins:latest
```

-   We've the multibranch pipe as the result below
    ![Alt text](image.png)
    ![Alt text](image-1.png)

### III. Install Cloudflare for publishing your site to internet without NAT port

```
    docker run  --detach \
    --name cloudflare \
    --restart unless-stopped \
    --network tealicious_network \
    cloudflare/cloudflared:latest \
    tunnel --no-autoupdate run \
    --token {{your_cloudflare_token}}
```

-   Our cloudflare tunel setup as the result below
    ![Alt text](image-2.png)

### IV. The result you should have got

-   The image below illustrates all Docker containers running in our system to publish `yentraquan.shop` on the internet.
    ![Alt text](image-3.png)

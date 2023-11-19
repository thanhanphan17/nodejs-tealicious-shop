```
    docker run --name jenkins -d -p 8080:8080 \
    --restart unless-stopped \
    --network nodejs-tealicious-shop_prod_network \
    --privileged -p 5000:5000 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v jenkins_home:/var/jenkins_home \
    --group-add $(stat -c '%g' /var/run/docker.sock) \
    jenkins/jenkins
```

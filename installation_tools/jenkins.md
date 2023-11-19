Jenkins

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

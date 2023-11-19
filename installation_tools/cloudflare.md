Cloudflare

```
    docker run  --detach \
    --name cloudflare \
    --restart unless-stopped \
    --network tealicious_network \
    cloudflare/cloudflared:latest \
    tunnel --no-autoupdate run \
    --token eyJhIjoiZWZkOWI1MTEzN2JiYWZiN2U3YjNhM2JlODhlY2IzZGMiLCJ0IjoiNzRiNmZlYWYtYTAzMC00YTZkLWE4NTUtYTBiNDAxMGEzZjE1IiwicyI6Ik5UUmxZV1kyT1RrdE4ySmtOUzAwWmpSbUxUbGlOakV0TUdNM016TTJPV05qTTJFeSJ9
```

## 1.3. Declarative approach

Instructions
In your "Log output" application, create a folder for manifests and move your deployment into a declarative file.

Make sure everything still works by restarting and following logs.

**Solution:** a Node.js app (`log_output/index.js`) that generates a UUID with `crypto.randomUUID()` once on startup and prints it every 5 seconds using `setInterval`. It is deployed with a single-replica `Deployment`.

### Deployment

The image is published on Docker Hub: [`arianesec/log-output:1.0`](https://hub.docker.com/r/arianesec/log-output).


```bash
cd log_output

# Deploy
kubectl apply -f manifests/deployment.yaml

# Confirm it's running
kubectl get pods
kubectl logs -f deployment/log-output
```

### Output

```
$ kubectl logs -f deployment/log-output
2026-10-29T15:09:28.404Z: b8f0bfbb-2892-4733-b13f-8cc32b1238b2
2026-10-29T15:09:33.441Z: b8f0bfbb-2892-4733-b13f-8cc32b1238b2
2026-10-29T15:09:38.445Z: b8f0bfbb-2892-4733-b13f-8cc32b1238b2
2026-10-29T15:09:43.447Z: b8f0bfbb-2892-4733-b13f-8cc32b1238b2
2026-10-29T15:09:48.451Z: b8f0bfbb-2892-4733-b13f-8cc32b1238b2
2026-10-29T15:09:53.456Z: b8f0bfbb-2892-4733-b13f-8cc32b1238b2
```

To build and publish the image:

```bash
docker build -t arianesec/log-output:1.0 .
docker push arianesec/log-output:1.0
```
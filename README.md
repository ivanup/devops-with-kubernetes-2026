## 1.1. Getting started

Instructions
Exercises can be done with any language and framework you want.

Create an application that generates a random string on startup, stores this string into memory, and outputs it every 5 seconds with a timestamp. e.g.

2020-03-30T12:15:17.705Z: 8523ecb1-c716-4cb6-a044-b9e83bb98e43
2020-03-30T12:15:22.705Z: 8523ecb1-c716-4cb6-a044-b9e83bb98e43

Deploy it into your Kubernetes cluster and confirm that it's running with kubectl logs ...

**Solution:** a Node.js app (`log_output/index.js`) that generates a UUID with `crypto.randomUUID()` once on startup and prints it every 5 seconds using `setInterval`. It is deployed with a single-replica `Deployment`.

### Deployment

```bash
# Build the image
docker build -t log-output:1.0 .

# Make the image available in the cluster
k3d image import log-output:1.0

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
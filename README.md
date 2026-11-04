## 1.7. External access with Ingress

Instructions
"Log output" application currently outputs a timestamp and a random string (that it creates on startup) to the logs.

Add an endpoint to request the current status (timestamp and the random string) and an Ingress so that you can access it with a browser.

You can just store the random string to the memory.

**Solution:** a Node.js app (`log_output/index.js`) that generates a UUID with `crypto.randomUUID()` once on startup and prints it every 5 seconds using `setInterval`. It is deployed with a single-replica `Deployment`.

### Deployment

The image is published on Docker Hub: [`arianesec/log-output:1.7`](https://hub.docker.com/r/arianesec/log-output).


```bash
cd log_output

# Deploy
k3d cluster create -p 8081:80@loadbalancer --agents 2
kubectl apply -f manifests

# Confirm it's running
kubectl get pods,svc,ing
kubectl logs -f deployment/log-output
```

### Output

```
$ kubectl get svc,ing
NAME                     TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/kubernetes       ClusterIP   10.43.0.1       <none>        443/TCP    11m
service/log-output-svc   ClusterIP   10.43.207.133   <none>        2345/TCP   11m

NAME                                           CLASS    HOSTS   ADDRESS                            PORTS   AGE
ingress.networking.k8s.io/log-output-ingress   <none>   *       172.18.0.2,172.18.0.3,172.18.0.4   80      11m

```

To build and publish the image:

```bash
docker build -t arianesec/log-output:1.7 .
docker push arianesec/log-output:1.7
```
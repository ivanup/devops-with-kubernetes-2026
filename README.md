## 1.6. The project, step 4

Instructions
Use a NodePort Service to enable access to the project.

**Solution:** a Node.js HTTP server (`todo_app/index.js`) that reads `process.env.PORT` (default 3000) and logs `Server started in port NNNN` when it starts listening. The port is set in the `Deployment` through an `env` entry (`PORT=5000`), so it can be changed by editing `manifests/deployment.yaml` and re-applying it, without rebuilding the image.

### Deployment

```bash
cd the_project/todo_app

# Deploy
k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2
kubectl apply -f manifests/deployment.yaml
kubectl apply -f manifests/service.yaml


# Confirm it's running
kubectl get pods
kubectl logs -f deployment/todo-app

```
### Output

```
$ kubectl logs -f deployment/todo-app
Server started in port 3000
```

To build and publish the image:

```bash
docker build -t arianesec/todo-app:1.0 .
docker push arianesec/todo-app:1.0
```

### Changing the port

Edit the `env` entry in `manifests/deployment.yaml` and apply it again:

```yaml
env:
  - name: PORT
    value: "6000"
```

```bash
kubectl apply -f manifests/deployment.yaml
kubectl rollout status deployment/todo-app
```

### Output

```
$ kubectl logs -f deployment/todo-app
Server started in port 6000
```

### Checking access using kubectl port-forward

```
$ kubectl port-forward todo-app-5875fd6d55-dqnng 6005:6000
Forwarding from 127.0.0.1:6005 -> 6000
Forwarding from [::1]:6005 -> 6000

In other terminal
curl http://localhost:6005
Todo app

$ kubectl port-forward todo-app-5875fd6d55-dqnng 6005:6000
Forwarding from 127.0.0.1:6005 -> 6000
Forwarding from [::1]:6005 -> 6000
Handling connection for 6005
Handling connection for 6005
Handling connection for 6005
Handling connection for 6005
```

### Checking access using NodePort Service

```
localhost:8082
↓
k3d load balancer
↓
node:30080 (NodePort)
↓
Pod container:6000

curl http:/localhost:8082
Todo app
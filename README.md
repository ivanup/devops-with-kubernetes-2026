## 1.4. The project, step2

Instructions
Create a deployment.yaml for the course project (that you started in Exercise 1.2.)

You won't have access to the port yet but that'll come soon..

**Solution:** a Node.js HTTP server (`todo_app/index.js`) that reads `process.env.PORT` (default 3000) and logs `Server started in port NNNN` when it starts listening. The port is set in the `Deployment` through an `env` entry (`PORT=5000`), so it can be changed by editing `manifests/deployment.yaml` and re-applying it, without rebuilding the image.

### Deployment

```bash
cd the_project/todo_app

# Deploy
kubectl apply -f manifests/deployment.yaml

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
## 1.2. The project, step 1

Instructions
Let's get started!

Create a web server that outputs "Server started in port NNNN" when it is started and deploy it into your Kubernetes cluster. Please make it so that an environment variable PORT can be used to choose the used port. You may call the server todo app since it will, amongst other things, provide the functionality of a todo application pretty soon.

You will not have access to the port when it is running in Kubernetes yet. We will configure the access when we get to networking.

**Solution:** a Node.js HTTP server (`todo_app/index.js`) that reads `process.env.PORT` (default 3000) and logs `Server started in port NNNN` when it starts listening. The port is set in the `Deployment` through an `env` entry (`PORT=5000`), so it can be changed by editing `manifests/deployment.yaml` and re-applying it, without rebuilding the image.

### Deployment

```bash
cd todo_app

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
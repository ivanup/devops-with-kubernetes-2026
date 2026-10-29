## 1.5. The project, step 3

Instructions
Make the project respond something to a GET request sent to the / url of the project. A simple HTML page is good, or you can deploy something more complex, like a single-page application.

See here(opens in a new tab) how you can define environment variables for containers.

Use kubectl port-forward to confirm that the project is accessible and works in the cluster by using a browser to access the project.

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
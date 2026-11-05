## 1.8. The project, step 5

Instructions
Switch to using Ingress instead of NodePort to access the project. You can delete the Ingress of the "Log output" application so they don't interfere with this exercise. We'll look more into paths and routing in the next exercise, and at that point, you can configure the project to run with the "Log output" application side by side.

### Deployment

The image is published on Docker Hub: [`arianesec/log-output:1.7`](https://hub.docker.com/r/arianesec/log-output).


```bash
cd the_project/todo_app

# Deploy
k3d cluster create -p 8081:80@loadbalancer --agents 2
kubectl apply -f manifests

# Confirm it's running
kubectl get pods,svc,ing
kubectl logs -f deployment/todo_app
```

### Output

```
$ kubectl get pods,svc,ing
NAME                            READY   STATUS    RESTARTS   AGE
pod/todo-app-7c9c74fcb9-rsb48   1/1     Running   0          5m41s

NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/kubernetes     ClusterIP   10.43.0.1       <none>        443/TCP    6h55m
service/todo-app-svc   ClusterIP   10.43.247.159   <none>        2345/TCP   5m41s

NAME                                         CLASS     HOSTS   ADDRESS                            PORTS   AGE
ingress.networking.k8s.io/todo-app-ingress   traefik   *       172.18.0.2,172.18.0.3,172.18.0.4   80      5m41s

curl http://localhost:8081
Todo app

```

To build and publish the image:

```bash
docker build -t arianesec/todo-app:1.0 .
docker push arianesec/todo-app:1.0
```
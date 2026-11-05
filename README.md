## 1.9. More services

Instructions
Develop a second application that simply responds with "pong 0" to a GET request and increases a counter (the 0) so that you can see how many requests have been sent. The counter should be in memory so it may reset at some point. Create a new deployment for it and have it share ingress with "Log output" application. Route requests directed '/pingpong' to it.

In future exercises, this second application will be referred to as "ping-pong application". It will be used with "Log output" application.

The ping-pong application will need to listen to requests on '/pingpong', so you may have to make changes to its code. This can be avoided by configuring the Ingress to rewrite the path, but we will leave that as an optional exercise. You can check out https://kubernetes.io/docs/concepts/services-networking/ingress/#the-ingress-resource(opens in a new tab)

### Deployment

The image is published on Docker Hub: [`arianesec/log-output:1.7`](https://hub.docker.com/r/arianesec/log-output) [`arianesec/pingpong:1.9`](https://hub.docker.com/r/arianesec/pingpong).


```bash
cd pingpong_log_output

# Deploy
k3d cluster create -p 8081:80@loadbalancer --agents 2
kubectl apply -f manifests

# Confirm it's running
kubectl get pods,svc,ing
```

### Output

```
$ kubectl get pods,svc,ing
NAME                              READY   STATUS    RESTARTS   AGE
pod/log-output-5c8bf797d9-scchd   1/1     Running   0          28s
pod/pingpong-d56d6b766-6m6qf      1/1     Running   0          28s

NAME                     TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
service/kubernetes       ClusterIP   10.43.0.1      <none>        443/TCP    73m
service/log-output-svc   ClusterIP   10.43.252.49   <none>        2345/TCP   28s
service/pingpong-svc     ClusterIP   10.43.212.26   <none>        2345/TCP   28s

NAME                                       CLASS     HOSTS   ADDRESS                            PORTS   AGE
ingress.networking.k8s.io/shared-ingress   traefik   *       172.18.0.2,172.18.0.3,172.18.0.4   80      28s

curl http://localhost:8081
2026-11-05T02:47:34.826Z: dc17afb5-c404-44eb-9ea0-8f107e0e8a1d

curl http://localhost:8081/pingpong
pong 0

curl http://localhost:8081/pingpong
pong 10
```

To build and publish the image:

```bash
docker build -t arianesec/pingpong:1.9 .
docker push arianesec/pingpong:1.9
```
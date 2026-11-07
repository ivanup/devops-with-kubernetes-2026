## 1.10. Even more services

Instructions
Split the "Log output" application into two different containers within a single pod:

One generates a random string on startup and writes a line with the random string and timestamp every 5 seconds into a file.
The other reads that file and provides the content in the HTTP GET endpoint for the user to see
You may find this(opens in a new tab) helpful now since there are more than one container running inside a pod.

### Deployment

The image is published on Docker Hub: [`arianesec/log-writer:1.10`](https://hub.docker.com/r/arianesec/log-writer) [`arianesec/log-reader:1.10`](https://hub.docker.com/r/arianesec/log-reader).


```bash
cd pingpong_log_output

# Deploy
k3d cluster create -p 8081:80@loadbalancer --agents 2
kubectl apply -f manifests/log_output_generator_reader.yaml -f manifests/ingress.yaml

# Confirm it's running
kubectl get pods,svc,ing
```

### Output

```
$ kubectl get pods,svc,ing
NAME                              READY   STATUS    RESTARTS   AGE
pod/log-output-7797d9688c-vc2hp   2/2     Running   0          115s

NAME                     TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
service/kubernetes       ClusterIP   10.43.0.1      <none>        443/TCP    14m
service/log-output-svc   ClusterIP   10.43.25.141   <none>        2345/TCP   115s

NAME                                       CLASS     HOSTS   ADDRESS                            PORTS   AGE
ingress.networking.k8s.io/shared-ingress   traefik   *       172.18.0.2,172.18.0.3,172.18.0.4   80      94s

curl http://localhost:8081
App Status from Shared File:
2026-11-07T17:51:23.322Z: 7c502485-46e9-4211-8de6-1e2ef335663a
```

To build and publish the image:

```bash
cd log_output/writer
docker build -t arianesec/log-writer:1.10 .
docker push arianesec/log-writer:1.10

cd log_output/reader
docker build -t arianesec/log-reader:1.10 .
docker push arianesec/log-reader:1.10
```
<div align="center">

# 🚀 Version 1.9: More services

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>

---

## 🎯 Exercise Instructions

Develop a second application that simply responds with "pong 0" to a GET request and increases a counter (the 0) so that you can see how many requests have been sent. The counter should be in memory so it may reset at some point. Create a new deployment for it and have it share ingress with "Log output" application. Route requests directed '/pingpong' to it.

In future exercises, this second application will be referred to as "ping-pong application". It will be used with "Log output" application.

The ping-pong application will need to listen to requests on '/pingpong', so you may have to make changes to its code. This can be avoided by configuring the Ingress to rewrite the path, but we will leave that as an optional exercise. You can check out https://kubernetes.io/docs/concepts/services-networking/ingress/#the-ingress-resource(opens in a new tab)

---

## 📦 Docker Images

Published on Docker Hub:
- [`arianesec/log-output:1.7`](https://hub.docker.com/r/arianesec/log-output)
- [`arianesec/pingpong:1.9`](https://hub.docker.com/r/arianesec/pingpong)

---

## 🛠️ Deployment & Execution

Follow these steps to set up the cluster and deploy the application:

```bash
# Navigate to the project directory
cd pingpong_log_output

# Create the k3d cluster with port mapping
k3d cluster create -p 8081:80@loadbalancer --agents 2

# Apply Kubernetes manifests
kubectl apply -f manifests

# Confirm it's running
kubectl get pods,svc,ing
kubectl logs -f deployment/log-output

# Checking
curl http://localhost:8081
2026-11-05T02:47:34.826Z: dc17afb5-c404-44eb-9ea0-8f107e0e8a1d

curl http://localhost:8081/pingpong
pong 0

curl http://localhost:8081/pingpong
pong 10
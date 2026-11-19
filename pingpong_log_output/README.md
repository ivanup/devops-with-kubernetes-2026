<div align="center">

# 🚀 Version 2.1: Connecting pods

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>

---

## 🎯 Exercise Instructions

Connect the Log output application and the Ping pong application with HTTP. So, instead of sharing data via files, use an HTTP GET endpoint in the Ping pong app to respond with the number of pongs for the Log output app. Remove the volume between the two applications for the time being.

---

## 📦 Docker Images

Published on Docker Hub:
- [`arianesec/log-output:2.1`](https://hub.docker.com/r/arianesec/log-output)
- [`arianesec/pingpong:2.1`](https://hub.docker.com/r/arianesec/arianesec/pingpong)
---

## 🛠️ Deployment & Execution

Follow these steps to set up the cluster and deploy the application:

```bash
# Navigate to the project directory
cd pingpong_log_output

# Create the k3d cluster with port mapping
k3d cluster create -p 8081:80@loadbalancer --agents 2

# Apply Kubernetes manifests
kubectl apply -f manifests/pingpong.yaml -f manifests/log_output.yaml -f manifests/ingress.yaml

# Confirm it's running
kubectl get pods,svc,ing
```
# Result
![Result](./docs/images/2.1.png)
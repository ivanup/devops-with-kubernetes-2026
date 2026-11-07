<div align="center">

# 🚀 Version 1.1: Getting started

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>

---

## 🎯 Exercise Instructions

Exercises can be done with any language and framework you want.

Create an application that generates a random string on startup, stores this string into memory, and outputs it every 5 seconds with a timestamp. e.g.

```
2020-03-30T12:15:17.705Z: 8523ecb1-c716-4cb6-a044-b9e83bb98e43
2020-03-30T12:15:22.705Z: 8523ecb1-c716-4cb6-a044-b9e83bb98e43
```

Deploy it into your Kubernetes cluster and confirm that it's running with kubectl logs ...

You will keep building this application in future exercises. This application will be called Log output.

---

## 📦 Docker Images

Published on Docker Hub:
- [`arianesec/log-output:1.1`](https://hub.docker.com/r/arianesec/log-output)

---

## 🛠️ Deployment & Execution

Follow these steps to set up the cluster and deploy the application:

```bash
# Navigate to the project directory
cd log_output

# Create the k3d cluster with port mapping
k3d cluster create --agents 2

# Apply Kubernetes manifests
kubectl create deployment log-output --image=arianesec/log-output:1.1
OR
kubectl apply -f manifests/deployment.yaml

# Confirm it's running
kubectl get pods
kubectl get deployments
kubectl logs -f deployment/log-output
<div align="center">

# 🚀 Version 1.3: Declarative approach

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>

---

## 🎯 Exercise Instructions

In your "Log output" application, create a folder for manifests and move your deployment into a declarative file.

Make sure everything still works by restarting and following logs.

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
kubectl apply -f manifests/deployment.yaml

# Confirm it's running
kubectl get pods
kubectl get deployments
kubectl logs -f deployment/log-output
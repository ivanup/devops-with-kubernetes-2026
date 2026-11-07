<div align="center">

# 🚀 Version 1.4: The project, step 2

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>

---

## 🎯 Exercise Instructions

Create a deployment.yaml for the course project (that you started in Exercise 1.2.)

You won't have access to the port yet but that'll come soon.

---

## 📦 Docker Images

Published on Docker Hub:
- [`arianesec/todo-app:1.2`](https://hub.docker.com/r/arianesec/todo-app)

---

## 🛠️ Deployment & Execution

Follow these steps to set up the cluster and deploy the application:

```bash
# Navigate to the project directory
cd the_project/todo_app

# Create the k3d cluster with port mapping
k3d cluster create --agents 2

# Apply Kubernetes manifests
kubectl apply -f manifests/deployment.yaml

# Confirm it's running
kubectl get pods
kubectl logs -f deployment/todo-app
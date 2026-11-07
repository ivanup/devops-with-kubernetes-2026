<div align="center">

# 🚀 Version 1.5: The project, step 3

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>

---

## 🎯 Exercise Instructions

Make the project respond something to a GET request sent to the / url of the project. A simple HTML page is good, or you can deploy something more complex, like a single-page application.

See here(opens in a new tab) how you can define environment variables for containers.

Use kubectl port-forward to confirm that the project is accessible and works in the cluster by using a browser to access the project.

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

# Checking access using kubectl port-forward

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
<div align="center">

# 🚀 Version 1.10: Even more services

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

</div>

---

## 🎯 Exercise Instructions

Split the "Log output" application into two different containers within a single pod:

One generates a random string on startup and writes a line with the random string and timestamp every 5 seconds into a file.
The other reads that file and provides the content in the HTTP GET endpoint for the user to see
You may find this(opens in a new tab) helpful now since there are more than one container running inside a pod.

---

## 📦 Docker Images

Published on Docker Hub:
- [`arianesec/log-writer:1.10`](https://hub.docker.com/r/arianesec/log-writer)
- [`arianesec/log-reader:1.10`](https://hub.docker.com/r/arianesec/log-reader)

---

## 🛠️ Deployment & Execution

Follow these steps to set up the cluster and deploy the application:

```bash
# Navigate to the project directory
cd pingpong_log_output

# Create the k3d cluster with port mapping
k3d cluster create -p 8081:80@loadbalancer --agents 2

# Apply Kubernetes manifests
kubectl apply -f manifests/log_output_generator_reader.yaml -f manifests/ingress.yaml
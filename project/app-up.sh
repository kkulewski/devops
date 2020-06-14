#!/bin/sh

cd backend
docker build -t kkulewski/mybackend .
docker push kkulewski/mybackend
cd ..

cd frontend
docker build -t kkulewski/myfrontend .
docker push kkulewski/myfrontend
cd ..

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f kubernetes/app-configmap.yml
kubectl apply -f kubernetes/redis-deployment.yml
kubectl apply -f kubernetes/redis-service-clusterip.yml
kubectl apply -f kubernetes/postgres-pvc.yml
kubectl apply -f kubernetes/postgres-secret.yml
kubectl apply -f kubernetes/postgres-deployment.yml
kubectl apply -f kubernetes/postgres-service-clusterip.yml
kubectl apply -f kubernetes/backend-deployment.yml
kubectl apply -f kubernetes/backend-service-clusterip.yml
kubectl apply -f kubernetes/frontend-deployment.yml
kubectl apply -f kubernetes/frontend-service-clusterip.yml
kubectl apply -f kubernetes/ingress-service.yml

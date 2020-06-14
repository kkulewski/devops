#!/bin/sh

cd mybackend
docker build -t kkulewski/mybackend .
docker push kkulewski/mybackend
cd ..

kubectl create -f myapp-configmap.yml
kubectl create -f dnsutils.yml
kubectl create -f redis-deployment.yml
kubectl create -f redis-service-clusterip.yml
kubectl create -f postgres-pvc.yml
kubectl create -f postgres-secret.yml
kubectl create -f postgres-deployment.yml
kubectl create -f postgres-service-clusterip.yml
kubectl create -f mybackend-deployment.yml
kubectl create -f mybackend-service-clusterip.yml
kubectl create -f ingress-service.yml

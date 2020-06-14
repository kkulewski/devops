#!/bin/sh

cd mybackend
docker build -t kkulewski/mybackend .
docker push kkulewski/mybackend
cd ..


kubectl apply -f mybackend-deployment.yml
kubectl apply -f mybackend-service-clusterip.yml
kubectl apply -f ingress-service.yml

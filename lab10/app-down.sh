#!/bin/sh

kubectl delete ingress ingress-service
kubectl delete service mybackend-clusterip
kubectl delete deploy my-backend-deployment

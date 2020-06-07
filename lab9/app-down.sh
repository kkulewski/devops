#!/bin/sh

kubectl delete svc mybackend-service
kubectl delete deploy my-backend-deployment
kubectl delete svc postgres-service
kubectl delete deploy postgres-deployment
kubectl delete configmap myapp-config
kubectl delete secret postgres-secret
kubectl delete pvc postgres-pvc-new
kubectl delete svc redis-service
kubectl delete deploy my-redis-deployment
kubectl delete pod dnsutils
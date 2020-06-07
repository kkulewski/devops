## Kubernetes - visit counter
- 3 instances of Express.js backend
- 1 shared instance of Redis cache
- 1 shared instance of PostgreSQL (with Private Volume)
- Secret and ConfigMap for PostgreSQL
- dnsutils
- NodePort (30009)

### Build and push container:
1. `cd mybackend`
2. `docker build -t kkulewski/mybackend .`
3. `docker push kkulewski/mybackend`
4. `cd ..`

### Setup:
1. `kubectl create -f dnsutils.yml`
2. `kubectl create -f redis-deployment.yml`
3. `kubectl create -f redis-service-clusterip.yml`
4. `kubectl create -f postgres-pvc.yml`
5. `kubectl create -f postgres-secret.yml`
6. `kubectl create -f postgres-config.yml`
7. `kubectl create -f postgres-deployment.yml`
8. `kubectl create -f postgres-service-clusterip.yml`
9. `kubectl create -f mybackend-deployment.yml`
10. `kubectl create -f mybackend-service-nodeport.yml`  

### Run:
1. `curl localhost:30009`
2. Open `localhost:30009` in your browser

### Teardown:
1. `kubectl delete svc mybackend-service`
2. `kubectl delete deploy my-backend-deployment`
3. `kubectl delete svc postgres-service`
4. `kubectl delete deploy postgres-deployment`
5. `kubectl delete configmap myapp-config`
6. `kubectl delete secret postgres-secret`
7. `kubectl delete pvc postgres-pvc-new`
8. `kubectl delete svc redis-service`
9. `kubectl delete deploy my-redis-deployment`
10. `kubectl delete pod dnsutils`

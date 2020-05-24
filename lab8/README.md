## Kubernetes - visit counter
3 instances of Express.js backend with 1 shared instance of Redis cache

### Build and push container:
1. `cd mybackend`
2. `docker build -t kkulewski/mybackend .`
3. `docker push kkulewski/mybackend`
4. `cd ..`

### Setup:
1. `kubectl create -f dnsutils.yml`
2. `kubectl create -f redis-deployment.yml`
3. `kubectl create -f redis-service-clusterip.yml`
4. `kubectl create -f mybackend-deployment.yml`
5. `kubectl create -f mybackend-service-nodeport.yml`  

### Run:
1. `curl localhost:30009`
2. Open `localhost:30009` in your browser

### Teardown:
1. `kubectl delete svc mybackend-service`
2. `kubectl delete deploy my-backend-deployment`
3. `kubectl delete svc redis-service`
4. `kubectl delete deploy my-redis-deployment`
5. `kubectl delete pod dnsutils`

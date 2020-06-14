- status
kubectl cluster-info

- config
kubectl config view

- list pods
kubectl get pods

- list system pods
kubectl get pods --namespace=kube-system

- create pod
kubectl create -f [pod-file.yml]

- pod details
kubectl describe pod [pod_name]

- delete pod
kubectl delete pod [pod_name]

- describe replicaset (rs)
kubectl describe rs [rs_name]

- get all
kubectl get all

- scale replicaset
kubectl scale --replicas=5 rs [rs_name]

- scale replicaset by file
kubectl scale --replicas=5 -f [rs_file.yml]

- replace yml
kubeclt replace -f [yml_file.yml]

- delete replicaset
kubectl delete rs [rs_name]

- get deployments
kubectl get deployments

- delete deployment
kubectl delete deployment [deployment_name]

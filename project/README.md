## Power with Kubernetes
base<sup>exponent</sup> with nginx, React, Express.js, Redis, Postgres  
- 1 instance of React frontend
- 3 instances of Express.js backend
- 1 instance of instance of Redis cache
- 1 instance of PostgreSQL (with Private Volume)
- Secret and ConfigMap for PostgreSQL
- nginx ingress

### Setup:
Use either `app-up.sh` script.

### Run:
1. Open `localhost` in your browser (frontend app)
2. Open `localhost/api` in your browser (backend app)

### Teardown:
Use `app-down.sh` script.

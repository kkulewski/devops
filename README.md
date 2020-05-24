# DevOps
- DockerHub: [/u/kkulewski](https://hub.docker.com/u/kkulewski)  
- TravisCI: [kkulewski](https://travis-ci.com/github/kkulewski)
# Projects
## [Kubernetes - visit counter](lab8/)
3 instances of Express.js backend with 1 shared instance of Redis cache
* `localhost:30009` (backend with visitor counter)
## [Docker Compose - Power](lab6/)
base<sup>exponent</sup> with nginx, React, Express.js, Redis, Postgres
* [nginx](lab6/nginx/)
  * `localhost:8080` (frontend)
  * `localhost:8080/api/` (backend)
* [frontend](lab6/frontend/) 
  * `localhost:4000` (app)
* [backend](lab6/backend/)
  * `localhost:5000` (health-check)
  * `localhost:5000/pow/base,exponent` (computed/Redis-cached power)
  * `localhost:5000/history` (previous results from Postgres DB)
# Labs
* [demo-backend](lab3-4-5/backend/)
  * `/` (health-check)
  * `/values` (GCD results from Postgres)
  * `/num1,num2` (compute GCD or use Redis cache)
* [demo-frontend](lab3-4-5/frontend/)
* [GCD](lab3-4-5/nwd/)
* [multi-container (express+redis)](lab3-4-5/multicontapp/)

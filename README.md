# DevOps
- DockerHub: [/u/kkulewski](https://hub.docker.com/u/kkulewski)  
- TravisCI: [kkulewski](https://travis-ci.com/github/kkulewski)
## Projects
### Power
base<sup>exponent</sup> with nginx, React, Express.js, Redis, Postgres
* [nginx](/nginx/)
  * `localhost:8080` (frontend)
  * `localhost:8080/api/` (backend)
* [frontend](/frontend/) 
  * `localhost:4000` (app)
* [backend](/backend/)
  * `localhost:5000` (health-check)
  * `localhost:5000/pow/base,exponent` (computed/Redis-cached power)
  * `localhost:5000/history` (previous results from Postgres DB)
## Labs
* [demo-backend](/previous-labs/backend/)
  * `/` (health-check)
  * `/values` (GCD results from Postgres)
  * `/num1,num2` (compute GCD or use Redis cache)
* [demo-frontend](/previous-labs/frontend/)
* [GCD](/previous-labs/nwd/)
* [multi-container (express+redis)](/previous-labs/multicontapp/)

## Power
base<sup>exponent</sup> with nginx, React, Express.js, Redis, Postgres

### Setup
`docker-compose up`

### Run
* [nginx](nginx/)
  * `localhost:8080` (frontend)
  * `localhost:8080/api/` (backend)
* [frontend](frontend/) 
  * `localhost:4000` (app)
* [backend](backend/)
  * `localhost:5000` (health-check)
  * `localhost:5000/pow/base,exponent` (computed/Redis-cached power)
  * `localhost:5000/history` (previous results from Postgres DB)

### Teardown
`docker-compose down`

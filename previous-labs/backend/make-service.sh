#!/bin/sh

docker stop my-backend my-redis my-postgres
docker network rm my-network
docker rmi backend

docker network create my-network
docker build -f Dockerfile.dev . -t backend
docker run -d --rm --network my-network --name my-redis redis
docker run -d --rm --network my-network --name my-postgres -e POSTGRES_PASSWORD=1234 postgres
sleep 5
docker run -d --rm --network my-network --name my-backend -p 5000:5000 -e REDIS_HOST=my-redis -e REDIS_PORT=6379 -e PGHOST=my-postgres -e PGPORT=5432 -e PGUSER=postgres -e PGPASSWORD=1234 -e PGDATABASE=postgres backend

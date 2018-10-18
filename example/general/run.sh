#!/bin/bash

docker build \
    -t gsg-general:0.1.0 ../../server

# run locally
docker-compose -p gsg-general down &&
docker-compose -p gsg-general up -d

# inject profile data
docker exec gsg-general-database_1 mongoimport --db gsg --collection profile --jsonArray --file profiles.json
# inject sample permission data
docker exec gsg-general-database_1 mongoimport --db gsg --collection permission --jsonArray --file permissions-sample.json

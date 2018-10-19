#!/bin/bash

docker build \
    -t gsg-general:0.1.0 ../../server

# run locally
docker-compose -p gsg-general down &&
docker-compose -p gsg-general up -d

# inject profile data & sample permission data
docker cp profiles.json gsg-general_database_1:/tmp/profiles.json
docker cp permissions-sample.json gsg-general_database_1:/tmp/permissions-sample.json
docker exec gsg-general_database_1 mongoimport --db gsg --collection profile --jsonArray --file /tmp/profiles.json
docker exec gsg-general_database_1 mongoimport --db gsg --collection permission --jsonArray --file /tmp/permissions-sample.json

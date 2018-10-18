#!/bin/bash

docker build \
    -t gsg-general:0.1.0 ../../server

# run locally
docker-compose -p gsg-general down &&
docker-compose -p gsg-general up
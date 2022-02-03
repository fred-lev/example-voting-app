#!/bin/bash

set -o errexit
set -o nounset
set -o pipefail

cd e2e || exit

docker-compose down >/dev/null 2>&1

docker-compose build

docker-compose up -d

docker-compose ps

docker-compose run --rm e2e

docker-compose down

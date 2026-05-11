#!/bin/bash

set -e

version=$1

if [ -z $version ]; then echo No version was supplied. && exit 1; fi

docker build -t ghcr.io/netbeheer-nederland/build-doc:upcoming -t ghcr.io/netbeheer-nederland/build-doc:latest -t ghcr.io/netbeheer-nederland/build-doc:$version .

docker push ghcr.io/netbeheer-nederland/build-doc:upcoming
docker push ghcr.io/netbeheer-nederland/build-doc:latest
docker push ghcr.io/netbeheer-nederland/build-doc:$version

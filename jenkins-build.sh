#!/bin/sh
echo 'hahahhaahha'
docker build -t sparkle:v1 .
docker-compose -v
docker-compose up -d
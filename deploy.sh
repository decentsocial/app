#!/bin/bash
ssh root@167.172.47.204 "cd /var/www/decent_social_app/; git pull; npm i; cd client && npm i && npm run build; docker-compose build --parallel; docker-compose stop; docker-compose up -d"
#!/bin/bash

for i in $(seq 1 50); do
  CODE=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 8)
  # shellcheck disable=SC2091
  COLOR=$(openssl rand -hex 3)
  response=$(curl -X POST -H "Content-Type:application/json" \
    -d '{"person":{"firstName":"Marko","lastName":"Jankovic","contacts":[{"type":"EMAIL","value":"'$CODE'@example.com"}]},"color":"#'$COLOR'"}' \
    http://api.reboot.zen.7aske.xyz/staffs)

done

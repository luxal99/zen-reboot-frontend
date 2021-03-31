#!/bin/bash

for i in $(seq 1 50); do
  response=$(curl -X POST -H "Content-Type:application/json" \
    -d '{"person":{"firstName":"Marko","lastName":"Jankovic","contacts":[{"value":"06531254","type":"PHONE"}]},"referralSource":{"id":2}}' \
    http://api.reboot.zen.7aske.xyz/clients)
done

#!/bin/bash
for i in $(seq 1 10000); do
  while IFS= read -r line; do
    fullNameArr=($line)
    response=$(curl -X POST -H "Content-Type:application/json" \
      -d '{"person":{"firstName":"'${fullNameArr[0]}'","lastName":"'${fullNameArr[1]}'","contacts":[{"value":"6969509312","prefix":"+225","type":"PHONE"}]},"referralSource":{"id":2}}' \
      http://api.reboot.zen.7aske.xyz/clients)
  done <names.txt
done

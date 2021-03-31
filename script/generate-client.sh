#!/bin/bash


for i in $(seq 1 100)
do
	curl -X POST -H "Content-Type:application/json" \
		-d '{"person":{"firstName":"Marko","lastName":"Jankovic","contacts":[{"value":"06531254","type":"PHONE"}]}}' \
		http://api.reboot.zen.7aske.xyz/clients
done

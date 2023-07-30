#!/bin/bash

if [[ $(sudo systemctl start mongod.service) != *"Unit mongod.service could not be found."* ]]; then
    printf "Installing gnupg and curl if they aren't already installed.\n";
    sudo apt-get install gnupg curl;

    printf "Creating list file for MongoDB";
    curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
    sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
    --dearmor;
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list";

    printf "Updating apt package list and installing MongoDB\n";
    echo "sudo apt update";
    echo "sudo apt install -y mongodb-org";

    printf "Starting MongoDB\n";
    echo "sudo systemctl start mongod.service"

    printf "Checking MongoDB status\n";
    echo "sudo systemctl status mongod";

    printf "Configure MongoDB service to start up at boot\n";
    echo "sudo systemctl enable mongod";
else printf "Mongo DB already installed";
fi

printf "Creating/using database";
echo "mongo activitypub"
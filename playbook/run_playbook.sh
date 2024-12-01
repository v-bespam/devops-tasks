#!/bin/bash

# Some variables
USER="root"                        # Username for connect to Debain VM
DEFAULT_NEW_USER_PASSWORD="pass"   # Default password for new user brickdev

# Check if NEW_USER_PASSWORD is provided as an argument
if [ -n "$1" ]; then
  NEW_USER_PASSWORD="$1"
else
  NEW_USER_PASSWORD="$DEFAULT_NEW_USER_PASSWORD"
fi

# Ensure that mkpasswd is installed
if ! command -v mkpasswd &> /dev/null; then
  echo "Error: mkpasswd is not installed."
  exit 1
fi

# Generating HASH for new user
PASSWORD_HASH=$(mkpasswd --method=sha-512 "$NEW_USER_PASSWORD")

# Run Ansible Playbook
ansible-playbook -i hosts.yml playbook.yml \
  -u "$USER" \
  --ask-become-pass \
  --ask-pass \
  --extra-vars "new_user_password=${PASSWORD_HASH}"

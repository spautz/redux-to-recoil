#!/usr/bin/env bash

# Fail if anything in here fails
set -e

# This script runs from the project root
cd "$(dirname "$0")/.."

source ./scripts/helpers/helpers.sh

###################################################################################################

echo "Going to doing everything: this will take a while..."
./scripts/clean-everything.sh
./scripts/setup-environment.sh
./scripts/build-everything.sh

###################################################################################################

echo "Done doing everything"

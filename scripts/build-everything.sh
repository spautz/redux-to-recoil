#!/usr/bin/env bash

# Fail if anything in here fails
set -e

# This script runs from the project root
cd "$(dirname "$0")/.."

source ./scripts/helpers/helpers.sh

###################################################################################################
# Setup

run_command "./scripts/check-environment.sh"
run_command "pnpm install"

###################################################################################################
# Run all read-write scripts and read-only scripts. This is overkill and duplicates a lot of work,
# but also helps catch intermittent errors. Suitable for running before lunch or teatime.

run_command "pnpm run all"
run_command "pnpm run all:readonly"
run_command "pnpm run packages:all"
run_command "pnpm run packages:all:readonly"

###################################################################################################

echo "All builds completed"

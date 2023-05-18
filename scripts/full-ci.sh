#!/usr/bin/env bash

# Fail if anything in here fails
set -e

# This script runs from the project root
cd "$(dirname "$0")/.."

source ./scripts/helpers/helpers.sh


if [[ $* == *--local* ]]; then

  if command_exists act; then
    # act =  https://github.com/nektos/act
    act
  else
    echo "Could not find act"
    exit 1
  fi

  # @TODO: Detect actions-runner/Runner.Client
  # https://github.com/ChristopherHX/runner.server

else
  # This is a manually-synced copy of what's in .github/worksflows/ci.yml
  run_command "corepack enable"
  run_command "./scripts/check-environment.sh"
  run_command "pnpm install --frozen-lockfile --ignore-scripts"
  run_command "pnpm clean"
  run_command "pnpm install --frozen-lockfile --offline"
  run_command "pnpm run all:ci"
  run_command "pnpm run packages:all:ci"

fi

###################################################################################################

echo "Local CI completed"

#!/usr/bin/env bash
die() { echo "$@" 1>&2 ; exit 1; }

[ "$#" -eq 2 ] || die "2 arguments required (team city user and team city password), $# provided"
export TEAM_CITY_USER="$1"
export TEAM_CITY_PASS="$2"
echo $1
#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

$DIR/node_modules/tsc/bin/tsc --module commonjs build.ts && node build.js $@

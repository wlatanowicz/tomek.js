#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

$DIR/node_modules/tsc/bin/tsc --module commonjs test.ts && node test.js $@

open $DIR/../test_build/index.html -a FireFox
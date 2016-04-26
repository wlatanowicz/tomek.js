#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR > /dev/null

$DIR/node_modules/tsc/bin/tsc --module commonjs new_test.ts && node new_test.js $@

popd > /dev/null

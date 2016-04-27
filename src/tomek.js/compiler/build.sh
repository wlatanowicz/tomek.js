#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR > /dev/null

$DIR/node_modules/tsc/bin/tsc --module commonjs build.ts && node build.js $@

ec=$?

popd > /dev/null

exit $ec

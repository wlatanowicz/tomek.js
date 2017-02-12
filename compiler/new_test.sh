#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR > /dev/null

if [ ! -d "$DIR/node_modules/tsc" ]
then
  $DIR/get_dependencies.sh
fi

$DIR/node_modules/tsc/bin/tsc --module commonjs new_test.ts && node new_test.js $@

popd > /dev/null

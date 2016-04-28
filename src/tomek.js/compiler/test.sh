#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR > /dev/null

if [ ! -d "$DIR/node_modules/tsc" ]
then
  $DIR/get_dependencies.sh
fi

$DIR/node_modules/tsc/bin/tsc --module commonjs test.ts && node test.js $@

popd > /dev/null

ls -1 $DIR/../test/tests | awk -f $DIR/test_list.awk > $DIR/../test_build/test_list.js

open $DIR/../test_build/index.html -a FireFox

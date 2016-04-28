#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR > /dev/null

if [ ! -d "$DIR/node_modules/tsc" ]
then
  $DIR/get_dependencies.sh
fi

$DIR/node_modules/tsc/bin/tsc --module commonjs build.ts && node build.js $@

ec=$?

popd > /dev/null

exit $ec

#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rm -R $DIR/../doc

pushd $DIR > /dev/null

$DIR/node_modules/.bin/ndoc $DIR/../framework --output $DIR/../doc

popd > /dev/null

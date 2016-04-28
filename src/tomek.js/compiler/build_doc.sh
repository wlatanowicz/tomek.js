#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rm -R $DIR/../doc

pushd $DIR > /dev/null

if [ ! -d "$DIR/node_modules/tsc" ]
then
  $DIR/get_dependencies.sh
fi

$DIR/node_modules/.bin/ndoc $DIR/../framework --output $DIR/../doc

popd > /dev/null

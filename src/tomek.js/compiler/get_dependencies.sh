#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR

npm install tsc
npm install libxmljs glob minimist md5 mkdirp fs-extra uglify-js ndoc

popd
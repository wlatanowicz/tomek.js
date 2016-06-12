#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR

npm install tsc

npm install object.observe
cp node_modules/object.observe/dist/object-observe.js ../compatibility/Object-observe.js

npm install es6-promise-polyfill
cp node_modules/es6-promise-polyfill/promise.js ../compatibility/Promise.js

npm install libxmljs glob minimist md5 mkdirp fs-extra uglify-js ndoc

popd
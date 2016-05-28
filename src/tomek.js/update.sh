#!/bin/bash

export GIT_SOURCE="https://github.com/wlatanowicz/tomek.js.git"
export WORK_DIR=`pwd`

ask_user() {
    eval name='$'$2
	echo -n "$1 [$name]: ";
	read input
	if [ "$input" != "" ]
	then
		export $2=$input;
	fi
}

ask_user "GIT source" "GIT_SOURCE"
ask_user "Working directory" "WORK_DIR"

pushd $WORK_DIR > /dev/null

mkdir -p $WORK_DIR/tmp

git clone $GIT_SOURCE $WORK_DIR/tmp/tomekjs.git

rm -Rf $WORK_DIR/framework
rm -Rf $WORK_DIR/compiler
rm -Rf $WORK_DIR/compatibility
rm -Rf $WORK_DIR/lib

cp -R $WORK_DIR/tmp/tomekjs.git/src/tomek.js/framework $WORK_DIR/framework
cp -R $WORK_DIR/tmp/tomekjs.git/src/tomek.js/compiler $WORK_DIR/compiler
cp -R $WORK_DIR/tmp/tomekjs.git/src/tomek.js/compatibility $WORK_DIR/compatibility
cp -R $WORK_DIR/tmp/tomekjs.git/src/tomek.js/lib $WORK_DIR/lib


rm -Rf $WORK_DIR/tmp
mkdir $WORK_DIR/tmp

popd > /dev/null
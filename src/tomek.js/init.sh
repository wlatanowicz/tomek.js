#!/bin/bash

export PROJECT="MyProject"
export GIT_SOURCE="https://github.com/wlatanowicz/tomek.js.git"
export MOBILE="no"

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
ask_user "Project name" "PROJECT"

export WORK_DIR=`pwd`/$PROJECT

ask_user "Working directory" "WORK_DIR"
ask_user "Make mobile application and initialize Cordova" "MOBILE"

if [ "$MOBILE" == "yes" ]
then
	cordova create $WORK_DIR
else
	mkdir -p $WORK_DIR
fi

pushd $WORK_DIR > /dev/null

mkdir $WORK_DIR/tmp

git clone $GIT_SOURCE $WORK_DIR/tmp/tomekjs.git

cp -R $WORK_DIR/tmp/tomekjs.git/src/tomek.js/framework $WORK_DIR/framework
cp -R $WORK_DIR/tmp/tomekjs.git/src/tomek.js/compiler $WORK_DIR/compiler
cp -R $WORK_DIR/tmp/tomekjs.git/src/tomek.js/compatibility $WORK_DIR/compatibility

if [ "$MOBILE" == "yes" ]
then
	cp -R $WORK_DIR/tmp/tomekjs.git/src/tomek.js/starters/mobile_hello_world $WORK_DIR/app
else
	cp -R $WORK_DIR/tmp/tomekjs.git/src/tomek.js/starters/hello_world $WORK_DIR/app
fi

rm -Rf $WORK_DIR/tmp

mkdir $WORK_DIR/tmp
mkdir $WORK_DIR/build

popd > /dev/null
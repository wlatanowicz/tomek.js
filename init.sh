#!/bin/bash

export PROJECT="MyTomekProject"
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

cat > package.json <<- EOM
{
    "private": true,
    "dependencies":{
	    "tomek.js" : "wlatanowicz/tomek.js"
    }
}
EOM

cat > .gitignore <<- EOM
build/*
tmp/*
node_modules
EOM

npm install

ln -s node_modules/tomek.js/framework .
ln -s node_modules/tomek.js/compiler .
ln -s node_modules/tomek.js/lib .

cp node_modules/tomek.js/gulpfile.js .

if [ "$MOBILE" == "yes" ]
then
	cp -R node_modules/tomek.js/starters/mobile_hello_world app
	rm -Rf www
	mkdir www
	ln -s www build
else
	cp -R node_modules/tomek.js/starters/hello_world app
	mkdir build
fi

mkdir tmp

gulp tsc

popd > /dev/null

echo "Project initialized"
echo -e "Now run \033[1mgulp build\033[0m or \033[1mgulp build watch\033[0m in your work dir to build your project"
if [ "$MOBILE" == "yes" ]
    echo -e "Next open \033[1mbuild/index.html\033[0m in your browser or build cordova project"
else
    echo -e "Next open \033[1mbuild/index.html\033[0m in your browser"
fi

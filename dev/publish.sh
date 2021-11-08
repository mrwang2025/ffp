#!/bin/bash

cd `dirname ${0}`
JQ=`readlink -f ./tools/jq-linux64`

echo "INFO: Start preparing the publish of npmjs module"
echo "INFO: 1) Copying ./modules/* to ../pack/src"
rm -rf ../pack/src/*
cp -R ./src/modules/* ../pack/src/

echo "INFO: 2) Change current directory to ./pack"
cd ../pack

echo "INFO: 3) Build the package"
yarn install
yarn build

RC=$?
echo "INFO: End preparing the publish of npmjs module"
if [ $RC -eq 0 ]; then
    echo "Success" 
else
    echo "Error - See above"
    exit 1
fi


echo "INFO: Publishing the module"
PACKAGE_JSON="./package.json"

read -p "Are you sure to publish the module to npmjs.com (y/N)? " -n 1
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]];then
    echo "Publish is canceled"
    exit 0
fi

echo "Current module version is "
$JQ '.version' $PACKAGE_JSON

read -p "Please give a new version for the module to be published: " NEW_VERSION
while [[ -z "$NEW_VERSION" ]]; do
    read -p "Enter the new version number: " NEW_VERSION
done

read -p "Are you sure to publish the module using ${NEW_VERSION} (y/N)? " -n 1
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]];then
    echo "Publish is canceled"
    exit 0
fi


tmp=$(mktemp)
$JQ ".version = \"${NEW_VERSION}\"" $PACKAGE_JSON > "$tmp" && mv "$tmp" $PACKAGE_JSON

echo "Current module version is "
$JQ '.version' $PACKAGE_JSON

echo "Rebuild the module "
yarn build
RC=$?
[ $RC -eq 0 ] && echo "Success" || echo "Error"

npm login
npm publish

echo "Cleanup the ./lib folder"
rm -rf ./lib
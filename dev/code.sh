#!/bin/bash
cd `dirname ${0}`
rm -rf ./public/code/*
cp -R ./src/examples/* ./public/code/
cd ./public/code/
sed -i 's/..\/modules/@mrwang2025\/react-ui/g' *
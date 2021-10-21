# React-UI
## Description
Some customized React UI components

## Demo
[Demo](https://react-ui.mrwang2025.com/)


## Install the package
    yarn add @mrwang2025/react-ui


## How to run the project in ./demo 
For debug convinience, the demo project directly import the components from the source code.
Since the the demo and module are in different project, the `yarn link` tool is needed to link two projects globally.

    cd ./
    yarn link

Output will looks like below
> success Registered "@mrwang2025/react-ui".
> 
> info You can now run `yarn link "@mrwang2025/react-ui"` in the projects where you want to use this package and it will be used instead. 
> 
> Done in 0.08s.

Then enter the demo project directory

    cd ./demo
    yarn link "@mrwang2025/react-ui

If the output like below:
> success Using linked package for "@mrwang2025/react-ui".
> 
> Done in 0.08s.

Then you will be ready to start the demo 

    yarn start
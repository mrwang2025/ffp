# The development repository

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `yarn pub`

This command will call the publish.sh script which can move the source code from ./src/modules into the ../pack/src folder and start the test build. if successfully built, it will prompt to publish the module into npmjs

### `yarn web`
Clean up the ../web folder and build this dev project, then move all the bullt files into ../web folder
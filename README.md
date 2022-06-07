# Create-react-app + XRPL sandbox

Putting the typescript XRPL client, [`xrpl.js`](https://github.com/XRPLF/xrpl.js), in a CRA app so it can be sandboxed and experimented with easily. Developers can fork the project, or:

1. `git clone https://github.com/ahoym-sandbox/tinft-tok.git`
2. `cd tinft-tok`
3. `yarn install`
4. `yarn start`

And play around with the library in the browser web console + enjoy auto updates to the TS file(s).

See the `xrpl` reference documentation for more details: https://xrpl.org/tutorials.html

## Recommended Tooling/Setup

- [Get `volta`](https://volta.sh/) for node/yarn version management
- (Optional, may not be necessary with `volta`) [Get `homebrew`](https://brew.sh/) for macOS package management
- (Optional, may not be necessary with `volta`) [Get and use `yarn`](https://classic.yarnpkg.com/en/docs/install/#homebrew) instead of `npm`
  - `brew install yarn`

## Developer notes

This project is still using react-scripts/CRA v4 because CRA v5 uses webpack v5, which does not bundle node core modules. While this makes sense in the browser world, it is an inconvenience for this project as xrpl.js does require usage of said modules. Since this is a sandbox starter, we opt to leave this on CRA v4 just for convenience's sake. See https://github.com/facebook/create-react-app/issues/11756 for more details on the issue if interested.

## References

- **S3 related**
  - [Upload files to s3 bucket, NodeJS](https://flaviocopes.com/node-upload-files-s3/)
  - [Make s3 bucket public](https://bobbyhadz.com/blog/get-s3-bucket-url)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

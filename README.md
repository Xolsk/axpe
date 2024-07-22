## ABOUT

You can follow instructions below to run the app, after installing an dependencies of course.
Some notes on the approach that has been taken.
I've opted for a "no fuss, keep it simple and straightforward" approach. This means, simple, efficient solutions that dont
mean doing everything from scratch, as many things should be improved

-Of course, ensuring that the API was called only once when fetching all meetups was a priority. Improving the useFetch to a more well rounded version would be a priority after all the requirements from this challenge have been met. For example, handling of what might be stale data.
-Adding React Router for its ease of use and convenience.
-About the favoriting approach. As there were no clear instructions about it, I opted for what I believe would be the sensible approach in real life. As I see no "submit" button available, I've decided that every favoriting action implies a put request to the Backend to save the new state in the database. Thats why we added JSON server to this repository, to be able to mock this kind of behaviour locally.
-In the same vein, for the sake of simplicity, the "Meetup" component has been generalised to be able to hold different lists, according to different possible filters. This filter could be improved to work not only with booleans, of course, by improving the prop filterBy to hold both the key and the expected value. Of course if the page required further customising another layer could be made, but I believe that for now it was unnecessary.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm server`

Runs a simple local server to be able to better see changes in the UI, in port 3001.
Remember that unless you run this command along npm start, the page will throw not found errors.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# COOKBOOK

### View the real thing

Want to see some delicious recipes? Navigate to **[the cookbook on Netlify](https://cookbook-keittokirja.netlify.app)**.

### Run the app locally

To run the app in development mode:
`npm start`

To run the app in production mode:
`npm run build`
&&
`npx serve -s build`

### About the design

- For styling the components **[@emotion/react](https://www.npmjs.com/package/@emotion/react)** was chosen. Styles are placed in the same files that they are used in.
- Components have been made as small as possible / practical.
- Functions have been made as small as possible / practical.
- Functions (that components use) have often been placed outside of the component so that it would be easier to see what the component actually does.

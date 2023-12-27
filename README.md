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

### Run tests

`npm run cypress:open` or `npm run cypress:run`

### About the design

- For styling the components, two different solutions were chosen: **[chakra ui](https://chakra-ui.com)** and **[@emotion/react](https://www.npmjs.com/package/@emotion/react)** (even though these did not seem to work too well together).
- For icons, **[Tabler icons](https://react-icons.github.io/react-icons/icons/tb/)** wer chosen.
- App colors were picked up from examples on **[Colors for designers](https://colorhunt.co/)**.
- Components have been made as small as possible / practical.
- Functions have been made as small as possible / practical.
- Functions (that components use) have often been placed outside of the component so that it would be easier to see what the component actually does.
- Styles are placed in the same files that they are used in (below component code, at the end of the file).

[![Netlify Status](https://api.netlify.com/api/v1/badges/17087ce1-9cd2-47a8-b7e2-9d81c06f9ad6/deploy-status)](https://app.netlify.com/sites/cookbook-keittokirja/deploys)

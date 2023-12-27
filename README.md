# COOKBOOK

### View the real thing

Want to see some delicious recipes? Navigate to **[the cookbook on Netlify](https://cookbook-keittokirja.netlify.app)**.

### Run the app locally

To run the app in development mode:
`npm run dev`

### Run tests

`npm run cypress:open` or `npm run cypress:run`

Note: If the tests fail, it might be that the waiting time is not long enough for the dynamic components to catch up (so increase that).

### About the design

- For styling the components, two different solutions were chosen: **[chakra ui](https://chakra-ui.com)** and **[@emotion/react](https://www.npmjs.com/package/@emotion/react)** (even though these did not seem to work too well together).
- For icons, **[Tabler icons](https://react-icons.github.io/react-icons/icons/tb/)** wer chosen.
- App colors were picked up from examples on **[Colors for designers](https://colorhunt.co/)**.
- Components have been made as small as possible / practical.
- Functions have been made as small as possible / practical.
- Functions (that components use) have often been placed outside of the component so that it would be easier to see what the component actually does.
- Styles are placed in the same files that they are used in (below component code, at the end of the file).

[![Netlify Status](https://api.netlify.com/api/v1/badges/17087ce1-9cd2-47a8-b7e2-9d81c06f9ad6/deploy-status)](https://app.netlify.com/sites/cookbook-keittokirja/deploys)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

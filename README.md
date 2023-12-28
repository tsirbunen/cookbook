# COOKBOOK

### View the real thing

Want to see some delicious recipes? Navigate to the **[COOKBOOK on Vercel](https://cookbook-dusky.vercel.app)**.
![Vercel](https://vercelbadge.vercel.app/api/tsirbunen/cookbook?style=plastic)

### Run the app

To run the app in development mode:
**`npm run dev`**

To lint, build and run the command:
**`npm run lint && npm run build && npm run start`**
and open **[http://localhost:3000](http://localhost:3000)** with your browser.

### Server (local development)

`supabase start`
The local development environment includes Supabase Studio, a graphical interface for working with your database, running by default on **[http://localhost:54323](http://localhost:54323)**.
`supabase stop`

`supabase db reset`
`supabase migration up`

To add a migration file, for example `supabase migration new create_table_RECIPES`

### Run tests

Trigger each feature file manually and view testing progress live
**`npm run cypress:open`**

or run tests only using command line
**`npm run cypress:run`**

Note: If the tests fail, it might be that the waiting time is not long enough for the dynamic page components to catch up. In that case, increase the waiting time **[here](/cypress/components/app.ts)**.

### About the design

- For styling the components, two different solutions were chosen: **[chakra ui](https://chakra-ui.com)** and **[@emotion/react](https://www.npmjs.com/package/@emotion/react)** (even though these did not seem to work too well together).
- For icons, **[Tabler icons](https://react-icons.github.io/react-icons/icons/tb/)** wer chosen.
- App colors were picked up from examples on **[Colors for designers](https://colorhunt.co/)**.
- Components have been made as small as possible / practical.
- Functions have been made as small as possible / practical.
- Functions (that components use) have often been placed outside of the component so that it would be easier to see what the component actually does.
- Styles are placed in the same files that they are used in (below component code, at the end of the file).

https://github.com/apollographql/apollo-client-nextjs

https://blog.logrocket.com/build-full-stack-app-next-js-supabase/

https://github.com/supabase-community/supabase-graphql-example/blob/main/app/pages/api/graphiql.ts
https://github.com/supabase/supabase/tree/master/examples/user-management/nextjs-user-management
https://supabase.com/docs/guides/cli/local-development
https://github.com/supabase/supabase/blob/master/examples/todo-list/nextjs-todo-list/supabase/config.toml
https://supabase.com/docs/guides/cli/local-development
https://supabase.com/docs/reference/javascript/rpc
https://dev.to/franciscomendes10866/nextjs-and-graphql-the-perfect-combination-for-full-stack-development-18l7

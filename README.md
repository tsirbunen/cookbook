# COOKBOOK

Interested in cooking something **delicious**? Navigate to the **[COOKBOOK](https://cookbook-dusky.vercel.app)** to view recipes.
COOKBOOK is a full-stack React Typescript web application built with the **[ Next.js](https://nextjs.org/docs)** framework.

![Vercel](https://vercelbadge.vercel.app/api/tsirbunen/cookbook?style=plastic) ![example workflow](https://github.com/tsirbunen/cookbook/actions/workflows/running-tests.yml/badge.svg)

### How to try it locally?

First make sure you have Node version ^20.10.0.

To run the application locally, first start a PostgreSQL database with Docker by running
&nbsp;&nbsp;&nbsp;&nbsp; **`docker run --name postgres_for_cookbook \`**
&nbsp;&nbsp;&nbsp;&nbsp; **`-p 5432:5432 -e POSTGRES_USER=postgres -e \`**
&nbsp;&nbsp;&nbsp;&nbsp; **`POSTGRES_PASSWORD=postgres -e \`**
&nbsp;&nbsp;&nbsp;&nbsp; **`POSTGRES_DB=postgres -d --rm postgres`**

Then install libraries
&nbsp;&nbsp;&nbsp;&nbsp; **`npm install`**

Then run the database migrations with
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run migrations:local`**

In case the Typescript types are missing or not up-to-date, run
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run generate:types`**

Then start the app in development mode with
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run dev`**

And finally open **[http://localhost:3000](http://localhost:3000)** with your browser to start using the COOKBOOK locally.

To run the app in **`DEBUG`** mode, select option "Full stack" in RUN AND DEBUG in Visual Studio Code.

### Tests

To trigger feature test files manually one by one with live viewing, first start the application in one shell (as described above) and then run in another shell
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run cypress:open`**

Alternatively, run all tests without viewing the tests live with
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run cypress:run`**

Note: If the tests fail, it might be that the waiting time is not long enough for the dynamic page components to catch up. In that case, increase the waiting time **[here](/cypress/components/app.ts)**.

### Libraries used

- Api graphQL server: the easy-to-set-up **[Graphql Yoga](https://the-guild.dev/graphql/yoga-server/docs)**
- Automatic code generation: **[@graphql-codegen/cli (with a preset and plugins)](https://the-guild.dev/graphql/codegen/docs/getting-started)** GraphQL Yoga with server preset for server and near-operation file generation for Apollo client
- Database: PostgresSQL hosted on **[Supabase](https://supabase.com)**
- TypeScript ORM: **[Drizzle ORM](https://orm.drizzle.team/docs/overview)**
- GraphQL Client: **[Apollo Client](https://www.apollographql.com/docs/react/)** with **[experimental support for next.js](https://www.npmjs.com/package/@apollo/experimental-nextjs-app-support)**
- Automated tests: **[Cypress testing](https://docs.cypress.io/guides/overview/why-cypress)** with a **[Cucumber-like](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor)**-experience
- Component styling: **[@emotion/react](https://www.npmjs.com/package/@emotion/react)**
- UI Component library: **[Chakra ui](https://chakra-ui.com)** (even though it did not seem to work too well together with @emotion/react if used in the same file)
- Icons: React **[Tabler icons](https://react-icons.github.io/react-icons/icons/tb/)**
- Color theme: picked up from examples on **[Colors for designers](https://colorhunt.co/)**
- App hosting: **[Vercel](https://vercel.com/)**

### Database

The tables of the database are configured using the Typescript files in **[database-schemas](/app/api/graphql/graphql-server/database/database-schemas/)**. Whenever a change is made to this folder's files, the database schema needs to be updated by running
&nbsp;&nbsp;&nbsp;&nbsp; **`npx drizzle-kit generate:pg`**
This will generate migration SQL-files into the **[migrations](/app/api/graphql/graphql-server/database/migrations/)**-folder specified in **[drizzle.config.ts](./drizzle.config.ts)** at project root.

To run the newly generated migrations to the local database use
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run migrations:local`**

Default env variables needed here have been hard coded for local use (and set through project's dashboard for production on Vercel).

To interact with the local database through a GUI (see the image below), run
&nbsp;&nbsp;&nbsp;&nbsp; **`npx drizzle-kit studio`**
and open **[https://local.drizzle.studio](https://local.drizzle.studio)** with your browser.

![](/assets/drizzle-studio.png)

### Database-related Typescript types

As **[Drizzle ORM](https://orm.drizzle.team/docs/overview)** is used to configure database tables' schemas, we simultaneously get the Typescript types of the database table entities "for free" (see for example table **[recipes](/app/api/graphql/graphql-server/database/database-schemas/recipes.ts)**).

### GraphQL-related code and Typescript type generation

Unlike with Drizzle ORM, some GraphQL-related code relies on **[code generation using @graphql-codegen/cli](https://the-guild.dev/graphql/codegen/docs/getting-started)**. The way code generation is set up in this project is this:

- Different features or entities are arranged into modules in the **[/modules](/app/api/graphql/graphql-server/modules/)** folder in the api code.
- The source of the GraphQL schema are the **schema.graphql**-files in folders in the modules folder, for example, see **[.../modules/recipe/schema.graphql](/app/api/graphql/graphql-server/modules/recipe/schema.graphql)**.
- The code generator is configured in the **[graphql-codegen.yml file](./graphql-codegen.yml)**.
- In server code generation, the **[Yoga server preset](https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga-with-server-preset)** is capable of using the schema.graphql files as input and producing typeDef, resolver and Typescript type ts-files as output.
- In client side code generation, the source files are the **queries.graphql**-files (see, for example, **[...recipes-service/queries.graphql](/src/recipes-service/queries.graphql)**). In code generation, the necessary Document objects and Variable and Query types are created into a file within the same folder. When using the generated types in client side, the types must be provided, for example `useQuery<AllRecipesQuery, AllRecipesQueryVariables>(AllRecipesDocument)`

Whenever making changes to schema, code update is needed and this can be performed by running
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run generate:types`**

### Deployment

When code is pushed to GitHub (any branch), all tests are automatically run.
When Vercel detects a new commit in branch **main**, that code is automatically deployed to production.

To run database migrations to production, use
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run migrations:production`**
Note that this needs that the correct POSTGRES-env variables can be found in the **.env**-file.

Env-variables needed in running the application in production have been set through the project's dashboard on Vercel. If new env variables are created, those need to be added through the dashboard manually.

The commands used to lint, build and start te project in production mode are  
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run lint`**
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run build`**
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run start`**

### Design and Guidelines

- Components should be smaller !!!
- Functions should be smaller !!!
- Functions are often placed outside of the component that use them so that it would be easier to see what the component actually does. This applies mainly to functions that do not need to, for example, set some state variable, but merely calculate some outcome for given input params.
- Css-styles are placed in the same files that they are used in, below the component code at the end of the file.

### Code structure

The structure of the project is very much **dictated by the Next.js framework** selected. The main structure is provided in the skeleton below, followed by a table with some descriptions.

```
cookbook/
├── app/
    ├── layout.tsx
    ├── page.tsx
    ├── recipes/
            └── page.tsx
    ├── api/
        └── graphql/
            ├── route.ts
            └── graphql-server/
                ├── database/
                ├── modules/
                └── services/
    ...
├── src/
    ├── app-layout/
    ├── app-pages/
    ├── components/
    ├── graphql-client/
    ├── navigation/
    ├── recipes-service/
    ├── theme/
    ...
...

```

| Folder / file | Description                                                                                        |
| :------------ | :------------------------------------------------------------------------------------------------- |
| app/          | When using the new App Router, all the routes need to be defined in the app folder                 |
| layout.tsx    | Required top level element (needed to modify HTML on initial load)                                 |
| page.tsx      | The launch page of the application                                                                 |
| recipes/      | The route recipes. Each route is a folder with a file named page.tsx containing page content       |
| api/          | The folder within which an "internal" api should be implemented in Next.js                         |
| api/graphql/  | The api route named graphql. Each route must contain a file route.ts                               |
| route.ts      | The file containing the route handler. In this project, the handler returns a Yoga request handler |

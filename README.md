## COOKING COMPANION (DESKTOP)

Want to cook something **delicious**? Navigate to the **[COOKING COMPANION](https://cookbook-dusky.vercel.app)** !!!
COOKING COMPANION is a full-stack React Typescript GraphQL web application built with the **[Next.js](https://nextjs.org/docs)** framework. It is meant to be used as a desktop app or with a tablet. For the mobile phone version of the app, please see the **[Flutter mobile project](https://github.com/tsirbunen/cooking-companion-mobile)**. The two apps (desktop and mobile) do not have exactly the same features available. The app is hosted at **[Vercel](https://vercel.com/)**.

![Vercel](https://vercelbadge.vercel.app/api/tsirbunen/cookbook?style=plastic) ![example workflow](https://github.com/tsirbunen/cookbook/actions/workflows/running-tests.yml/badge.svg)

### How to try it locally?

First make sure you have Node version ^20.10.0 installed.

To run the application locally, first start a PostgreSQL database with Docker by running
&nbsp;&nbsp;&nbsp;&nbsp; **`docker run --name postgres_for_cooking_companion -p 5432:5432 -e POSTGRES_USER=postgres -e \`**
&nbsp;&nbsp;&nbsp;&nbsp; **`POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -d --rm postgres`**

Then install libraries
&nbsp;&nbsp;&nbsp;&nbsp; **`npm install`**

Then run the database migrations with
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run migrations:local`**

In case the Typescript types are missing or not up-to-date, run
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run generate:types`**

Then start the app in development mode with
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run dev`**

And finally open **[http://localhost:3000](http://localhost:3000)** with your browser to start using the COOKING COMPANION locally.

To run the app in **`DEBUG`** mode, select option "Full stack" in RUN AND DEBUG in Visual Studio Code.

To insert example data to the local database, run
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run insert_example_data`**

## TESTS

#### API tests

Api service tests are in **[this directory](./app/api/graphql/graphql-server/services/__tests__/)**. To run the api tests use either of the following

&nbsp;&nbsp;&nbsp;&nbsp; **`npm run test:api`**
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run test:api:watch`**

_Note: The tests mainly exercise the functionality of the api service including the interactions with the database meaning that the api interacts with the database in most of these tests. Before each test is run, the database is cleared of all data, so if you have made changes to the database, the changes will be lost._

#### UI tests

**Unit and React Component/Hook test** files have been placed into **\_\_tests\_\_** -folders next to the code they test. To run these tests for ui, use either of

&nbsp;&nbsp;&nbsp;&nbsp; **`npm run test:ui`**
&nbsp;&nbsp;&nbsp;&nbsp; **`npm run test:ui:watch`**

These tests do not interact with the database or the api so the tests can be run in isolation (no running database or app is required).

#### E2E tests

**E2E feature tests** require that the app and the database are running in the background so first start the app in one shell. Then, in another shell, start Cypress tests either in an interactive mode (where you can trigger tests manually one by one from UI) or in a non-interactive mode

&nbsp;&nbsp;&nbsp;&nbsp; **`npm run cypress:open`**

&nbsp;&nbsp;&nbsp;&nbsp; **`npm run cypress:run`**

In both cases, the database is cleared and new example data is inserted into the database before starting the tests.

_Note 1:_ If the cypress tests fail, it might be that the waiting time is not long enough for the dynamic page components to catch up. In that case, increase the waiting time.

_Note 2:_ The cypress E2E tests are truly E2E only when run locally. For some reason (related to the ApolloNextAppProvider) the Apollo Client could not be made to work in GitHub Actions testing environment and therefore in GitHub test flow the hook using Apollo Client to fetch data from api is replaced with a mock.

### Libraries used

- Api graphQL server: the easy-to-set-up **[Graphql Yoga](https://the-guild.dev/graphql/yoga-server/docs)**
- Automatic code generation: **[@graphql-codegen/cli (with a preset and plugins)](https://the-guild.dev/graphql/codegen/docs/getting-started)** GraphQL Yoga with server preset for server and near-operation file generation for Apollo client
- Database: **PostgresSQL** hosted on **[Supabase](https://supabase.com)**
- TypeScript ORM: **[Drizzle ORM](https://orm.drizzle.team/docs/overview)**
- GraphQL Client: **[Apollo Client](https://www.apollographql.com/docs/react/)** with **[experimental support for next.js](https://www.npmjs.com/package/@apollo/experimental-nextjs-app-support)**
- Unit and React Component/Hook tests: **[jest](https://jestjs.io/docs/getting-started)**, **[@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)** and **[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)**
- E2E tests: **[Cypress testing](https://docs.cypress.io/guides/overview/why-cypress)** with a **[Cucumber-like](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor)**-experience
- Component styling: **[@emotion/react](https://www.npmjs.com/package/@emotion/react)**
- UI Component library: **[Chakra ui](https://chakra-ui.com)** (even though it did not seem to work too well together with @emotion/react if used in the same file)
- Icons: **[React icons](https://react-icons.github.io/react-icons/icons/tb/)**

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
NOTE: You might need to delete autogenerated type-files before that!

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

##### GraphQL "Errors" and Errors

When investigating how to best inform the frontend GraphQL clients about errors like **username already exists**, I bumped into **[this article by Sasha Solomon](https://sachee.medium.com/200-ok-error-handling-in-graphql-7ec869aec9bc)**. Sasha considers such errors **alternative results** instead of being errors and suggests server to return union types (of the actual entity and the error). This approach is also described **[here](https://the-guild.dev/blog/graphql-error-handling-with-fp)** and implemented in the Cooking Companion app where applicable.

##### General

- Components should be smaller !!!
- Functions should be smaller !!!
- Css-styles are placed in the same files that they are used in, below the component code at the end of the file.

### Codebase overall structure

The structure of the project is very much **dictated by the selected Next.js framework**. The main structure is provided in the skeleton below, followed by a table with some descriptions.

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
├── cypress/
├── src/
    ├── app-pages/
    ├── assets/
    ├── constants/
    ├── graphql-client/
    ├── layout/
    ├── navigation/
    ├── recipes-service/
    ├── state/
    ├── test-utils/
    ├── theme/
    ├── types/
    ├── widgets/
    ...
...

```

| Folder / file      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| layout.tsx         | Top level layout element (required by Next.js; needed to modify HTML on initial load). All common providers are introduced here to be available to application throughout                                                                                                                                                                                                                                                                              |
| page.tsx           | The launch page of the application (the default starting route "/" required by Next.js)                                                                                                                                                                                                                                                                                                                                                                |
| **app/**           | Due to selecting the **Next.js framework** with the new App Router, all the routes need to be defined in the app folder as sub-folders that are named according to the route they serve, and that contain a file named **page.tsx** with the page content (for example, for route "recipes/" there is app/recipes/page.tsx). The page.tsx files only contain "wrappers" that return the actual components that have there code in src/app-pages folder |
| **api/**           | The "internal" api is contained as an app route in the app folder (required byt Next.js)                                                                                                                                                                                                                                                                                                                                                               |
| **graphql/**       | The api route named graphql is in the api folder in a folder with the same name (i.e. _graphql_). The folder contains a file named route.ts (required by Next.js)                                                                                                                                                                                                                                                                                      |
| route.ts           | The file containing the route handler. In this project, the handler returns a Yoga request handler                                                                                                                                                                                                                                                                                                                                                     |
| **cypress/**       | Cypress E2E testing related files                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **\_\_tests\_\_**  | These folders (that are scattered around) contain test files that test the code nearby.                                                                                                                                                                                                                                                                                                                                                                |
| **src/app-layout** |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### File structure

#### React component files

The order of appearance of "elements" within a single react component file is the following:

- imports
- declared constants and types
- the component itself
- css styling

Conventions:
Move as much of the styling "out" of the component to the below css section so that it is easier to see the relevant component functionality.

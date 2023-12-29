# COOKBOOK

COOKBOOK is a full-stack web application built with the **[ Next.js](https://nextjs.org/docs)** framework and hosted on **[Vercel](https://vercel.com/)**.
Want to see some delicious recipes? Navigate to the **[COOKBOOK](https://cookbook-dusky.vercel.app)**.

![Vercel](https://vercelbadge.vercel.app/api/tsirbunen/cookbook?style=plastic) ![example workflow](https://github.com/tsirbunen/cookbook/actions/workflows/running-tests.yml/badge.svg)

### JUST RUN IT LOCALLY

To run the application locally, one needs a PostgreSQL database and the application itself.
First start a PostgreSQL database with Docker by running
**`docker run --name postgres_for_cookbook -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -d --rm postgres`**

Then run the migrations with
**`npm run migrations:local`**

Then run the app in development mode
**`npm run dev`**

And finally open **[http://localhost:3000](http://localhost:3000)** with your browser to start using the COOKBOOK locally.

### TESTS

**[Cucumber-like](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor)**-experience **[cypress testing](https://docs.cypress.io/guides/overview/why-cypress)** was selected as the main type of automated tests for the application.
To trigger each feature test-file manually (with live viewing), first start the application in one shell (as described above) and then (in another shell) run
**`npm run cypress:open`**

To run all tests without viewing the tests live, use
**`npm run cypress:run`**

Note: If the tests fail, it might be that the waiting time is not long enough for the dynamic page components to catch up. In that case, increase the waiting time **[here](/cypress/components/app.ts)**.

### DATABASE

For permanent data storage, **[PostgreSQL by Supabase](https://supabase.com)** was selected. To easily use the database, the **[Drizzle ORM](https://orm.drizzle.team/docs/overview)** was selected. Default env variables related to database have been hard coded for local use (and set through projects dashboard for production on Vercel).
After changing or updating the database schema (for example, creating a new Typescript file describing a new database table), update the migration files by running:
**`npx drizzle-kit generate:pg`**
This will generate migration SQL-files into the **[migrations](/app/api/graphql/graphql-server/database/migrations/)**-folder specified in drizzle.config.ts at project root.

To interact with the local database through a GUI, run
**`npx drizzle-kit studio`**
and open **[https://local.drizzle.studio](https://local.drizzle.studio)**. With this tool you can easily run queries to the database (see the image below):
![](/assets/drizzle-studio.png)

To run the migrations to the database locally use:
`npm run migrations:local`
When running migrations in production use:

### DEPLOYMENT TO PRODUCTION

When code is pushed to GitHub (any branch), all tests are automatically run.
When Vercel detects a new commit in branch **main**, that branch is automatically deployed to production.
To run database migrations to production:
**`npm run migrations:production`**
Note that here the correct POSTGRES\_\* env variables need to be set in the .env-file. Otherwise the necessary env params have been set for production through the project's dashboard on Vercel.

The commands used in production are  
**`npm run lint`**
**`npm run build`**
**`npm run start`**

### PROJECT'S LIBRARIES, DESIGN AND GUIDELINES

**LIBRARIES:**

- For styling the components, two different solutions were chosen: **[chakra ui](https://chakra-ui.com)** and **[@emotion/react](https://www.npmjs.com/package/@emotion/react)** (even though these did not seem to work too well together).
- For icons, **[Tabler icons](https://react-icons.github.io/react-icons/icons/tb/)** were chosen.
- App colors were picked up from examples on **[Colors for designers](https://colorhunt.co/)**.

**DESIGN & GUIDELINES:**

- Components have been made as small as possible / practical.
- Functions have been made as small as possible / practical.
- Functions (that components use) have often been placed outside of the component so that it would be easier to see what the component actually does.
- Styles are placed in the same files that they are used in (below component code, at the end of the file).

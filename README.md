# COOKBOOK

COOKBOOK is a full-stack web application built with the **[ Next.js](https://nextjs.org/docs)** framework and hosted on **[Vercel](https://vercel.com/)**.

![Vercel](https://vercelbadge.vercel.app/api/tsirbunen/cookbook?style=plastic)

![example workflow](https://github.com/tsirbunen/cookbook/actions/workflows/running-tests.yml/badge.svg)

#### APPLICATION IN PRODUCTION

Want to see some delicious recipes? Navigate to the **[COOKBOOK](https://cookbook-dusky.vercel.app)**.

#### RUN THE APP LOCALLY

To run the app in development mode locally:
**`npm run dev`**

To lint, build and run locally:
**`npm run lint && npm run build && npm run start`**

In either case, open **[http://localhost:3000](http://localhost:3000)** with your browser.

#### RUN TESTS

**[Cucumber-like](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor)-experience [cypress testing](https://docs.cypress.io/guides/overview/why-cypress)** was selected as the main type of automated tests for the application. To trigger each feature file manually with live viewing, first start the application in one shell, then in another shell run

**`npm run cypress:open`**

To run all tests without viewing the progress, just run
**`npm run cypress:run`**

Note: If the tests fail, it might be that the waiting time is not long enough for the dynamic page components to catch up. In that case, increase the waiting time **[here](/cypress/components/app.ts)**.

#### DATABASE

For permanent data storage, **[PostgreSQL by Supabase](https://supabase.com)** was selected. To easily use the database, the **[Drizzle ORM](https://orm.drizzle.team/docs/overview)** was selected.
Note: When Drizzle connects to the database in production, it uses the POSTGRES\_\* env-variables set through Vercel Dashboard. For other modes, default values have been hard coded.

npx drizzle-kit studio

To automatically generate migration files from database schema files, run:
`npx drizzle-kit generate:pg`
This will generate migration SQL-files into the file specified in drizzle.config.ts at project root. To run the migrations to the database locally use:
`npm run migrations:local`
When running migrations in production use:
`npm run migrations:production`
In the latter case the correct POSTGRES\_\* env variables need to be set in the .env-file.

To run a PostgreSQL database locally with Docker:
`docker run --name postgres_for_cookbook -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -d --rm postgres`

#### DEPLOYMENT

When code is pushed to GitHub (any branch), all tests are automatically run.
When Vercel detects a new commit in branch **main**, that branch is automatically deployed.

### Server (local development)

`supabase start`
The local development environment includes Supabase Studio, a graphical interface for working with your database, running by default on **[http://localhost:54323](http://localhost:54323)**.
`supabase stop`

`supabase db reset`
`supabase migration up`

To add a migration file, for example `supabase migration new create_table_RECIPES`

### About the design

- For styling the components, two different solutions were chosen: **[chakra ui](https://chakra-ui.com)** and **[@emotion/react](https://www.npmjs.com/package/@emotion/react)** (even though these did not seem to work too well together).
- For icons, **[Tabler icons](https://react-icons.github.io/react-icons/icons/tb/)** wer chosen.
- App colors were picked up from examples on **[Colors for designers](https://colorhunt.co/)**.
- Components have been made as small as possible / practical.
- Functions have been made as small as possible / practical.
- Functions (that components use) have often been placed outside of the component so that it would be easier to see what the component actually does.
- Styles are placed in the same files that they are used in (below component code, at the end of the file).

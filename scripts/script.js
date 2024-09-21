import { execSync } from 'child_process'
import select, { Separator } from '@inquirer/select'
import fs from 'fs'

/**
 * This script uses inquirer to prompt the user to select a script from the package.json
 * file to run. It also includes some custom commands, for example those to generate
 * DB migration files and to start PostgreSQL with Docker.
 */

const generateMigrationsCommand = 'npx drizzle-kit generate:pg'
const generateMigrationFilesName = 'Generate DB migration files'
const runPostgreSQLWithDockerCommand =
  'docker run --name postgres_for_cooking_companion -p 5432:5432 -e POSTGRES_USER=postgres -e \
     POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -d --rm postgres'
const runPostgreSQLWithDockerName = 'Run PostgreSQL with Docker'

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
const scripts = Object.keys(packageJson.scripts)

const scriptToRun = await select({
  message: 'Select a script to run',
  pageSize: scripts.length + 3,
  choices: [
    ...scripts.map((script) => ({
      name: script,
      value: script
    })),
    new Separator(),
    {
      name: generateMigrationFilesName,
      value: generateMigrationsCommand
    },
    {
      name: runPostgreSQLWithDockerName,
      value: runPostgreSQLWithDockerCommand
    }
  ]
})

const command =
  scriptToRun === generateMigrationsCommand
    ? generateMigrationsCommand
    : scriptToRun === runPostgreSQLWithDockerCommand
    ? runPostgreSQLWithDockerCommand
    : `npm run ${scriptToRun}`

console.log(`\x1b[32mSTART RUNNING: \x1b[31m${command}\x1b[0m`)
execSync(command, { stdio: 'inherit' })
console.log(`\x1b[32mDONE RUNNING!\x1b[0m`)

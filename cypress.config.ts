import { defineConfig } from 'cypress'
import configuration from './cypress/plugins/index'

export default defineConfig({
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    reportFilename: '[status]_[datetime]-[name]',
    timestamp: 'yyyy-mm-dd',
    html: true,
    json: false,
    overwrite: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)

          return null
        }
      })

      return configuration(on, config)
    },
    specPattern: './***/**/*.feature',
    supportFile: './cypress/support/e2e.ts',
    chromeWebSecurity: false,
    baseUrl: 'http://localhost:3000'
  }
})

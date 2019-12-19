import { readdirSync } from 'fs'
import { basename, join } from 'path'
import { capitalize } from '../../utils/String'

let models = {}

readdirSync(__dirname)
  .forEach(file => {
    if (file !== basename(__filename) && file.endsWith('.js')) {
      const modelName = file.replace(/\.js$/, '')
      const model = require(join(__dirname, '/', modelName)).default

      models[capitalize(modelName)] = model
    }
  })

module.exports = models

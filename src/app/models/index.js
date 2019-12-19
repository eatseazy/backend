import Sequelize from 'sequelize'
import { readdirSync } from 'fs'
import {
  basename,
  join,
} from 'path'

const dotenv = require('dotenv')
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgresql' })
let db = {}

readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0 && (file !== basename(__filename)) && (file.slice(-3) === '.js')))
  .forEach(file => {
    const model = sequelize['import'](join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db

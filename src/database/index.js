import mongoose from 'mongoose'

const connectToDatabase = () => {
  const databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017/eatseazy"

  return mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

module.exports = {
  connectToDatabase
}

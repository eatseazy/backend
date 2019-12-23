import { ApolloServer } from 'apollo-server'
import AppModule from './app'

const PORT = process.env.PORT || 8080

const server = new ApolloServer({
  modules: [AppModule],
  context: AppModule.context
})

server.listen(PORT, () => {
  console.log(`Server ready`)
})

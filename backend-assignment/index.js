const {ApolloServer} = require('apollo-server-express')
const {ApolloServerPluginDrainHttpServer} = require('apollo-server-core')
const {Sequelize} = require('sequelize')
const express = require('express')
const http = require('http')
const {typeDefs} = require('./schemas/schema')
const {Query} = require('./resolvers/Query')
const {Mutation} = require('./resolvers/mutation')
const {getAuthorized} = require('./services/helper')
require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
})

async function startApolloServer () {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation
    },
    context:{
      sequelize,
      getAuthorized
    },
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  })

  await server.start()
  server.applyMiddleware({app})
  await new Promise(resolve => httpServer.listen({port: 4000}, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()

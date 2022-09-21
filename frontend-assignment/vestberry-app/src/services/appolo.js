import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client'

const uri = `http://localhost:8000/graphql`

const httpLink = new HttpLink({uri})

const cache = new InMemoryCache()

const link = ApolloLink.from([httpLink])

const client = new ApolloClient({
  link,
  cache,
})

export default client

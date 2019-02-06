import {ApolloServer, ApolloError} from 'apollo-server'
import gql from 'graphql-tag'
import fetch from 'node-fetch'
import {makeExecutableSchema, mergeSchemas} from 'graphql-tools'
import {createGithubRemoteSchema} from './github'

const typeDefs = gql`
  type Spaceship {
    name: String
  }

  input NewItemInput {
    name: String!
  }

  type Query {
    spaceships(first: Int, skip: Int): [Spaceship]
  }
`


const resolvers = {
    Query: {
        spaceships: async (_, args, context, info) => {
            const {first = 10, skip = 0} = args;
            const items = await fetch('https://swapi.co/api/starships').then(res => res.json())
            return items.results.slice(skip, first)
        }
    },
}


const mountSchema = async (typeDefs, resolvers) => {
    const personalSchema = makeExecutableSchema({typeDefs, resolvers})
    const githubSchema = await createGithubRemoteSchema()


    const server = new ApolloServer({
        schema: mergeSchemas({schemas: [personalSchema, githubSchema]})
    })


    server
        .listen()
        .then(leke => console.log(leke.url))
        .catch(err => console.error(err))
}

mountSchema(typeDefs, resolvers)

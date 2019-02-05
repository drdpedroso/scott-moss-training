import {ApolloServer, ApolloError} from 'apollo-server'
import gql from 'graphql-tag'

const typeDefs = gql`
  type Item {
    name: String
    done: Boolean
  }

  input NewItemInput {
    name: String!
  }

  type Query {
    getItem: Item
  }

  type Mutation {
    createItem(input: NewItemInput): Item!
  }
`

const isItemValid = () => false

const resolvers = {
    Query: {
        getItem: () => {
        }
    },
    Mutation: {
        createItem: (_, args, context, info) => {
            const {name} = args.input
            return isItemValid()
                ? {
                    name,
                    done: true
                }
                : new ApolloError('Legit', 401)
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server
    .listen()
    .then(leke => console.log(leke.url))
    .catch(err => console.error(err))

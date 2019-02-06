import {HttpLink} from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
import fetch from 'node-fetch'
import {introspectSchema, makeRemoteExecutableSchema} from 'graphql-tools'

const createGithubRemoteSchema = async () => {
    const http = new HttpLink({uri: 'https://api.github.com/graphql', fetch})
    const link = setContext(() => ({
        headers: {
            Authorization: 'bearer 15136086546a72e9cc0f0f89b7b713ecde1590dc'
        }
    })).concat(http)

    const schema = await introspectSchema(link)

    return makeRemoteExecutableSchema({
        schema, link
    })
}

export {createGithubRemoteSchema}

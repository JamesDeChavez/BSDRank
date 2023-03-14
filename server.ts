import mongoose from 'mongoose'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import dotenv from 'dotenv'

dotenv.config()
const PORT = Number(process.env.PORT) || 3001
const MONGODB_URI = process.env.MONGODB_URI

const server = new ApolloServer({
    typeDefs, resolvers
})

const main = async () => {
    await mongoose.connect(`${MONGODB_URI}`)
    const { url } = await startStandaloneServer(server, {
        context: async ({req, res}) => ({
            authScope: req.headers.authorization
        }),
        listen: { port: PORT }
    })
    console.log(`Server ready at: ${url}`)
}

main().catch(err => console.log(err))



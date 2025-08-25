require('dotenv').config()
const express= require('express')
const PORT = process.env.PORT || 3000
const {graphqlHTTP} = require('express-graphql')
const schema = require('./Schema/schema')
const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})

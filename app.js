const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const axios = require("axios");

async function startServer() {
  const server = new ApolloServer({
    typeDefs: `
            type User {
                id:ID!
                name:String!
                username:String!
                email:String!
                phone:String!
                website:String!
            }

            type Todo {
                id: ID!
                title: String!
                completed: Boolean!
                user:User!
            }

            type Query {
                getTodos: [Todo]
                getAllUsers:[User]
                getUser(id:ID!):User
            }
        `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          await axios
            .get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
            .then((res) => res.data),
      },
      Query: {
        getTodos: async () =>
          await axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.data),
        getAllUsers: async () =>
          await axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.data),
        getUser: async (parent, args) =>
          await axios
            .get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
            .then((res) => res.data),
      },
    },
  });

  // Use standalone server instead of Express handler
  const { url } = await startStandaloneServer(server, {
    listen: { port: 8000 },
  });

  console.log(`Server running at ${url}`);
}

startServer();

const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser= require('body-parser')
const cors= require('cors')
const { default: axios } = require('axios')


async function startServer(){
    const app = express()
    const server = new ApolloServer({
        typeDefs:`
            type Todo {
                id:ID!,
                title:String!,
                completed:Boolean!,
                userId:ID!,
                user: User
            }
            type User {
                id:ID!,
                name:String!,
                username:String!,
                email:String!,
                phone:String!
            }
            type Query {
                getTodos:[Todo]
                getUsers:[User]
                getUser(id:ID!):User
            }
        `,
        resolvers:{
            Todo : {
                user: async(todo)=>{
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
                    return response.data;
                }
            },
            
            Query: {
                getTodos: async ()=> {const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
                    return response.data;
                },
                getUsers: async ()=> {const response = await axios.get("https://jsonplaceholder.typicode.com/users")
                    return response.data;
                },
                getUser: async (parent,{id})=> {const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                    return response.data;
                }
                
            }
        }
    })
    //Middleware
    app.use(bodyParser.json())
    app.use(cors())

    //GraphQl Server
    await server.start()
    app.use('/graphql',expressMiddleware(server))
    app.listen(8000,()=> console.log("Server Started"))
}

startServer()
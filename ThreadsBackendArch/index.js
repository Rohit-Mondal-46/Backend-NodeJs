const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware}= require('@apollo/server/express4')
const bodyParser= require('body-parser')
const axios = require('axios');

async function startServer(){
    const app = express()
    const server = new ApolloServer({
        typeDefs:`type Post {
            id:ID!,
            body:String!,
            userId:ID!,
            title:String!,
            user: User!
        },
        type User {
            id:ID!,
            name:String!,
            username:String!,
            email:String!,
            phone:String!
        },
        type Query {
            getPosts:[Post]
            getUsers:[User]
            getUser(id:ID!):User
        }`,
        resolvers:{
            Post : {
                user: async(todo)=>{
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
                    return response.data;
                }
            },
            Query: {
                getPosts: async ()=> {const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
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

    app.use(bodyParser.json())

    await server.start()

    app.use('/graphql',expressMiddleware(server))

    app.get('/',(req,res)=>{
        res.json({
            message:"this is server"
        })
    })
    app.listen(8000,()=>console.log("server started"))
}

startServer();
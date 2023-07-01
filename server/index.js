const express = require("express")
const app = express()
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");


const port = 4500 || process.env.port 

const users = [{}];






app.use(cors())

app.get("/",(request,response)=>{

    response.send("hey its working")
})



const server = http.createServer(app);

const IO = socketIO(server);

IO.on("conection",(socket)=>{
    console.log("New conection")

    socket.on('joined',({user})=>{
        users[socket.id]=user;
        console.log(`${user} has joined`)
        socket.bordcast.emit('userjoined',{user:"Admin", message:`${users[socket.id]} has joined`})
        socket.emit('welcome',{user:"Admin",message:`welcome to the chat,${users[socket.id]}`})


    })


    // we send a whole message to all user
    socket.on('message',(message,id)=>{
        IO.emit('sendMessage',{user:users[id],message,id})

    })


    socket.on('disconnect',()=>{
        socket.bordcast.emit('leave',{user:"ADmin",message:`${users[socket.id]} user has left`})
        console.log(`user left`)
    })
     

})



server.listen(8000,()=>{
    console.log(`server is started successfully onn http://localhost:${port}`)
})
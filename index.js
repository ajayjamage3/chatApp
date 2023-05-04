const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const app = express()
app.use(express.json())
const {connection} = require("./config/db")
app.use(cors())
require("dotenv").config()
const {userRouter} = require("./routes/user.routes")

const httpServer = http.createServer(app)

app.use("/user",userRouter)

const port = process.env.port

const io = new Server(httpServer)

const users  =[]
io.on("connection", socket  =>{
    socket.on("new-user-joined", name =>{
        users[socket.id] = name;    
        socket.broadcast.emit("user-joined", name);
    })

    socket.on("send_message", message =>{
        socket.broadcast.emit("receive_message", {message, name:users[socket.id]});
    })

    socket.on("disconnect", message =>{
        socket.broadcast.emit("left_message", users[socket.id]);
        delete users[socket.id];
    })
})
app.get("/users",(req,res)=>{
    let array = []
    for(let i in users){
        array.push(users[i])
    }
    res.send(array.join("\n"))
})


httpServer.listen(port,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at ${port}`)
})





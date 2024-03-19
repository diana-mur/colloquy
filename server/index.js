import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import chatRouter from "./routes/chatRoute.js"
import messageRouter from "./routes/messageRoute.js"

const app = express()

mongoose.connect(
    'mongodb+srv://mine:ALWTOl3HsB7w3gw4@clustercollo.ccbjdkf.mongodb.net/test?retryWrites=true&w=majority'
)
.then(() => console.log('Db Ok!'))
.catch((error) => console.log('Db error ', error))

app.use(express.json())
app.use(cors())
app.use("/api/users", userRouter)
app.use("/api/chats", chatRouter)
app.use("/api/messages", messageRouter)

const start = () => {
    app.listen(5000, () => {
        console.log('СЕРВЕР РАБОТАЕТ НА ПОРТУ 5000');
    })
}

start()

// mine
// ALWTOl3HsB7w3gw4
// 207.148.19.131/32
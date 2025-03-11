import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import contactsRoutes from'./routes/ContactRoutes.js'
import messagesRoutes from "./routes/MessagesRoutes.js"
import setupSocket from "./socket.js"
dotenv.config()

const app=express();
const port = process.env.PORT || 3001;
const databaseURL = "mongodb+srv://admin:admin@cluster0.76a8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,
})
);
app.use("/uploads/profiles",express.static("uploads/profiles"))
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/contacts',contactsRoutes);
app.use('/api/messages',messagesRoutes)
const server = app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})
setupSocket(server);
console.log("databaseURL",databaseURL);
mongoose.connect(databaseURL)
.then((con)=> console.log('DB Connection Successfully',con))
.catch((err)=>console.log(err.message))
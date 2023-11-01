import express from "express";
import dotenv from "dotenv";
import router from "./router.js";
import cors from 'cors';
import connection from "./conn.js";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/authentication",router);
connection().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log("SERVER STARTED");
})})
.catch(()=>{
    console.log("DATA BASE NOT CONNECTED");
})
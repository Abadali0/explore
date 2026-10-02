import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/product.js";
import connectDB from "./utils/DB.js";
import  dns from "node:dns/promises";
import { verifyJWT,signJWT } from "./utils/jwt.js"
import UserRoute from "./routes/user.js";


dns.setServers(["1.1.1.1","8.8.8.8"]);

dotenv.config();

const app = express();
connectDB()
app.use(express.json());
app.use(cors());
app.use("/products",productsRouter);
app.use("/user",UserRoute);


const PORT= 5050;

app.listen(PORT,()=>{
    console.log("Server running on port 5050");
});

const token=signJWT({
    name:"Zeeshan Ali",
    userId:"2024387023",
    userType:"admin",
});
 console.log(token)
 console.log(verifyJWT(token))





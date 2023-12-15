// 1. Import Express
import bodyParser from "body-parser";
import express from "express";
import ProductRouter from "./src/features/product/product.routes.js"

// 2. create server
const server = express();

server.use(bodyParser.json())

// For all request related to product redirect to product route
// localhost:3200/api/products
server.use("/api/products", ProductRouter);

// 3. Default Request Handler
server.get("/",(req,res)=>{
    res.send("Welcome to Ecommerce APIs");
})

// 4. Specify PORT
server.listen(3200,()=>{
    console.log("Server is running at PORT:: 3200");
});

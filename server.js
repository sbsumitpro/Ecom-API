// 1. Import Express
import bodyParser from "body-parser";
import express from "express";
import productRouter from "./src/features/product/product.routes.js"
import userRouter from "./src/features/user/user.routes.js"
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";

// 2. create server
const server = express();

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))

// For all request related to product redirect to product route
// localhost:3200/api/products
server.use("/api/products", basicAuthorizer,productRouter);
server.use("/api/users",userRouter );

// 3. Default Request Handler
server.get("/",(req,res)=>{
    console.log(req.url)
    res.send("Welcome to Ecommerce APIs");
})

// 4. Specify PORT
server.listen(3200,()=>{
    console.log("Server is running at PORT:: 3200");
});

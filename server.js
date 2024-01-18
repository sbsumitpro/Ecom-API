// 1. Import Express
import bodyParser from "body-parser";
import express from "express";
import swagger from "swagger-ui-express";
import productRouter from "./src/features/product/product.routes.js"
import userRouter from "./src/features/user/user.routes.js"
import cartItemRouter from "./src/features/cart/cart.routes.js"
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" assert {type:"json"}; // without assert keyword it will give an error
import loggerMiddleware from "./src/middlewares/logger.middleware.js"
import ApplicationError from "./src/error-handler/application-error.js";


// 2. create server
const server = express();

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))
server.use("/api-docs",swagger.serve, swagger.setup(apiDocs))

server.use(loggerMiddleware)
// For all request related to product redirect to product route
// localhost:3200/api/products
server.use("/api/products",
            jwtAuth,
            productRouter
        );
server.use("/api/cartItems",
            jwtAuth,
            cartItemRouter
        );
server.use("/api/users",userRouter );

// 3. Default Request Handler
server.get("/",(req,res)=>{
    console.log(req.url)
    res.send("Welcome to Ecommerce APIs");
})

// Error handling middleware
server.use((err, req, res, next)=>{
    console.log(err);
    if(err instanceof ApplicationError){
        return res.status(err.code).send(err.message);
    }

    // server errors
    return res
        .status(500)
        .send("Something went wrong, Please try later.")
})

// 4. Middleware to handle 404 requests
server.use((req,res)=>{
    res.status(404).send("API not found, Please check our documentation for more information at localhost:3200/api-docs")
})


// 5. Specify PORT
server.listen(3200,()=>{
    console.log("Server is running at PORT:: 3200");
});

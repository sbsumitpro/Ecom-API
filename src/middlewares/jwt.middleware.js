import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next)=>{
    // 1. read the token
    // console.log(req.headers)
    const token = req.headers["authorization"];
    console.log(token)
    // 2. If no token, return error 
    if(!token){
        return res.status(401).send("Unauthorized");
    }

    // 3. Check if the token is valid
    try{
        const payload = jwt.verify(token, "anaMueC7T7pkkOXjzSSJOxttJs7p4dUB")
        console.log(payload)
    }
    catch(err){
    // 4. return error
        console.log(err)
        return res.status(401).send("Unauthorized");   
    }

    // 5. call next middleware
    next();

}

export default jwtAuth;
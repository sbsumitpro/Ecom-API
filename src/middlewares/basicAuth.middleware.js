import UserModel from "../features/user/user.model.js"

const basicAuthorizer = (req, res, next)=>{
    
    // 1. check if authorization header is empty

    const authHeader = req.headers["authorization"]

    if(!authHeader){
        return res.status(401).send("No Authorization details found!")
    }
    console.log(authHeader)
    // 2. Extract credentials: [Basic wqwqerqerjqe732841734dasd]
    const base64Credentials = authHeader.replace("Basic ", "");

    console.log(base64Credentials);

    //3.  Decode credentials

    const decodedCreds = Buffer.from(base64Credentials, "base64").toString("utf-8");
    console.log(decodedCreds, typeof(decodedCreds))   // "username:password"
    const creds = decodedCreds.split(":");
    const [email, password] = creds
    const users = UserModel.getAll()
    const user = users.find(u=>u.email==email && u.password == password);
    if(user){
        next()
    }else{
        return res.status(401).send("Invalid Credentials")
    }
}

export default basicAuthorizer;
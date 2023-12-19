
import UserModel from "./user.model.js";
import Jwt  from "jsonwebtoken";

export default class UserController{
    signUp(req, res){
        const {name, email, password, type} = req.body;
        console.log(req.body)
        const newUser = UserModel.signUp(name, email, password, type);
        return res.status(201).send(newUser);
    }

    signIn(req,res){
        const {email, password} = req.body;
        const user = UserModel.signIn(email, password);
        if(user){
            // 1. create Token
            const token = Jwt.sign({userID:user.id, email:user.email},"anaMueC7T7pkkOXjzSSJOxttJs7p4dUB",{expiresIn:"1h"})

            // 2. send the Token
            return res.status(200).send(token);
        }else{
            return res.status(400).send("Incorrect credential")
        }
    }
}
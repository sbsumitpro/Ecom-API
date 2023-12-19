
import UserModel from "./user.model.js";

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
            return res.status(200).send("Successfully logged in")
        }else{
            return res.status(400).send("Incorrect credential")
        }
    }
}
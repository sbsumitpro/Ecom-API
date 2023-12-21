import CartItems from "./cart.model.js";


export class CartController{
    add(req, res){
        const {productID, quantity} = req.query;
        const userID = req.userID
        if(!userID){
            return res.status(401).send("You are not authorized")
        }
        const error = CartItems.add(productID, userID, quantity,res);
      
        if(error){
            return res.status(400).send(error)
        }else{
            return res.status(201).send({
                "msg": "cart updated successfully"        
            })
        }

    }

    get(req, res){
        const userID = req.userID;
        const items = CartItems.get(userID);

        return res.status(200).send(items);
    }

    delete(req, res){
        const userID = req.userID;
        const productID = req.params.id;
        const error = CartItems.delete(productID, userID);
        if(error){
            return res.status(400).send(error);
        }else{
            return res.status(200).send("Cart Item is removed")
        }
    }
}
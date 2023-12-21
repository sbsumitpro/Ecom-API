import ProductModel from "../product/product.model.js"
// productID, userID, quantity
let id = 0
export default class CartItems{
    constructor(productID, userID,quantity){
        this.id = ++id
        this.productID = productID,
        this.userID= userID,
        this.quantity = quantity
    }

    static add(productID,userID, quantity,res){
        // check if product exists
        const product = ProductModel.getAll().find(p=>p.id == productID)
        console.log("product", product)
        if(!product){
            return res.send("Product not found")
        }
        if(quantity<=0){
            return res.send("Add a positive number as quantity");
        }

        // check if already the item is added in the cart
        const cartItemIndex = cartItems.findIndex(i=>i.userID==userID && i.productID == productID)

        if(cartItemIndex<0){
            // if no cartitem is present, create new cart items
            const newItem = new CartItems(productID, userID, quantity);
            cartItems.push(newItem);
            // return newItem;
        }else{
            // update the old cart item quantity
            cartItems[cartItemIndex].quantity = quantity
        }
    }

    static get(userID){
        return cartItems.filter(i=> i.userID == userID)
    }

    static delete(productID, userID){
        const cartItemIndex = cartItems.findIndex(i=> i.userID == userID && i.productID == productID)
        if(cartItemIndex == -1){
            return "Item not found"
        }else{
            cartItems.splice(cartItemIndex, 1)
        }
    }
}

const cartItems = [
    new CartItems(2,1,2),
    new CartItems(3,2,4)
]

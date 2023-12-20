import ProductModel from "../product.model.js";

export default class ProductController{

    getAllProduct(req,res){
        const products = ProductModel.getAll()
        // console.log(products)
        res.status(200).json(products)
    }

    addProduct(req, res){
        const {name, price, sizes} = req.body
        // console.log(req.body)
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes:sizes.split(","),
            imgUrl: req.file.filename
        }
        ProductModel.add(newProduct);
        res.status(201).send(newProduct)
    }

    rateProduct(req, res){
        const {userID, productID, rating} = req.query;
        const error = ProductModel.rateProduct(userID, productID, rating);

        if(error){
            return res.status(400).send(error);
        }else{
            return res.status(200).send("Rating has been added.");
        }

    }

    getOneProduct(req,res){
        const id = req.params.id;
        const product = ProductModel.getSingleProduct(id)
        if(!product){
            res.status(404).send("Product not found!")
        }else{
            return res.status(200).send(product)
        }
    }

    filterProducts(req,res){
        const {minPrice, maxPrice, category} = req.query;
        console.log(req.query)
        const result = ProductModel.filter(minPrice, maxPrice, category)
        return res.status(200).send(result)
    }
}
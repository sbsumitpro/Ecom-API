import UserModel from "../user/user.model.js";


export default class ProductModel{
    constructor(id, name, desc, price, imgUrl, category, sizes){
        this.id = id,
        this.name = name
        this.desc = desc,
        this.price = price,
        this.imgUrl = imgUrl,
        this.category = category,
        this.sizes = sizes
    }

    static add(product){
      product.id = products.length + 1;
      products.push(product);
      return product;
    }

    static filter(minPrice, maxPrice, category){
      console.log(minPrice, maxPrice, category)
      const result = products.filter((product)=>{
        return (
          (!minPrice || product.price>=minPrice) && 
          (!maxPrice || product.price<=maxPrice) && 
          (!category || product.category == category)
          )
      })
      return result;
    }

    static getSingleProduct(id){
      const product = products.find(product=>product.id==id)
      return product;
    }

    static getAll(){
        return products;
    }

    static rateProduct(userID, ProductID, rating){

      //validate user
      const user = UserModel.getAll().find(u=>u.id ==userID)
      if(!user){
        return res.send("User not found")
      }

      //validate product
      const product = products.find(p=>p.id == ProductID)
      if(!product){
        return res.send("Product not found")
      }

      // Check if there is any rating, If no then add a rating array
      if(!product.rating){
        product.rating = [];
        console.log("1st time added")
        product.rating.push({
          userID,
          rating
        })
        return
      }

      // Check if user rating is already available
      const existingRatingIndex = product.rating.findIndex(r=>r.userID == userID)
      console.log(existingRatingIndex)
      if(existingRatingIndex>=0){
        product.rating[existingRatingIndex] = {
          userID,
          rating
        }
      }else{
        //if no exisiting rating, then add a rating
        product.rating.push({
          userID,
          rating
        })
      }



    }
}

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Category1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Category2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Category3',
      ['M', 'XL','S']
    )];
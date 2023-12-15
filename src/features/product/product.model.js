
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
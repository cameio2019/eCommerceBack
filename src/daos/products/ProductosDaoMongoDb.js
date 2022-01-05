import ContenedorMongoDb from "../../containers/ContainerMongoDB.js"
// import Schema from "mongoose";

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super('products', {
            name: { type: String, required: true},
            description: { type: String, required: true},
            category: { type: String, required: true},
            code: { type: String, required: true, unique: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            thumbnail: { type: String, required: true}
        },{timestamps:true})
    }

    async addProduct(product){
        try{
            let result = await this.collection.create(product)
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async updateProduct(id,body){
        try{
            let result = await this.collection.findByIdAndUpdate(id, {$set: body})
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }
}

export default ProductosDaoMongoDb;


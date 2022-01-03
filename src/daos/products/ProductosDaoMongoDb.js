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
}

export default ProductosDaoMongoDb;


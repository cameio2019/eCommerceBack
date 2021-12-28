import ContenedorMongoDb from "../../containers/ContainerMongoDB.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('products', {
            name: { type: String, required: true, max: 50 },
            description: { type: String, required: true, max: 250 },
            category: { type: String, required: true, max: 50 },
            code: { type: String, required: true, unique: true, max: 10 },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            thumbnail: { type: String, required: true, max: 100 }
        })
    }
}

export default ProductosDaoMongoDb;


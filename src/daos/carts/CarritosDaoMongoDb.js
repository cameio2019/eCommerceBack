import ContenedorMongoDb from "../../containers/ContainerMongoDB.js"
import Schema from 'mongoose';

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            products: { type: [{
                type:Schema.Types.ObjectId, 
                ref:'products'
            }],
                default:[]}
        },{timestamps:true})
    }

    // async guardar(carrito = { products: [] }) {
    //     return super.guardar(carrito)
    // }
}

export default CarritosDaoMongoDb;

import ContenedorMongoDb from "../../containers/ContainerMongoDB.js"
import Schema from 'mongoose';

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
    //     super('carritos', {
    //         products: { type: [{
    //             type:Schema.Types.ObjectId, 
    //             ref:'products'
    //         }],
    //             default:[]}
    //     },{timestamps:true})
    // }

    // // async guardar(carrito = { products: [] }) {
    // //     return super.guardar(carrito)
    // // }
    super(
        'carrito',
        {
            products:[{
                type:Schema.Types.ObjectId,
                ref:'products',
            }]                
        },{ timestamps:true }
    )
}

async createCart(){
    try{
        let newCart = await this.collection.create({products:[]})
        return {status:"succes", messagge:'Carrito creado correctamente.', payload:newCart}
    }catch(err){
        return {status:"error", error:err.message}
    }
}

async addProduct(id, productId){
    try{
        let result = await this.collection.updateOne({_id:id},{$push:{products:productId}})
        return {status:"success", payload:result}
    }catch(err){
        console.log(err)
        return {status:"error", message:`Error al intentar agregar el producto con ${productId} en el carrito ${idNumber}: ${err}`}
        
    }
}

async getProductsByCartId(id){
    try{
        const cart = await this.collection.findById(id)
        const products = cart.products
        return {status:"success", payload:products}
    }catch(err){
        return {status:"error", message:err}
    }
}

async deleteProduct(id, productId){
    try{
        let result = await this.collection.updateOne({_id:id},{$pull:{products:productId}})
        return {status:"success", message:`Producto ${idNumber} eliminado correctamente.`, payload:result}
    }catch(err){
        console.log(err)
        return {status:"error", message:`Error al eliminar el producto ${productId} del carrito ${idNumber}: ${err}`}
        
    }
}
}

export default CarritosDaoMongoDb;

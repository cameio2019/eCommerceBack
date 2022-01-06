import ContenedorFirebase from "../../containers/ContainerFirebase.js"
import admin from 'firebase-admin'
const db = admin.firestore()

class CarritosDaoFirebase extends ContenedorFirebase {

    // constructor() {
    //     super('carritos')
    // }

    // async guardar(carrito = { productos: [] }) {
    //     return super.guardar(carrito)
    // }

    constructor(){
        super(db.collection('carrito'))
    }

    async createCart(){
        try{
            const doc = await this.query.doc()
            let nuevoCarrito = await doc.set({products:[]})
            return {status:"success", payload:nuevoCarrito}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async addProduct(id, productId){
        try{
            const cartD = await this.query.doc(id).get()
            const cart = cartD.data()
            const products = [...cart.products, productId]
            await this.query.doc(id).set({products})
            return {status:"success", message:`Producto agregado al carrito ${id}`}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error al agregar el Producto ${productId} en el carrito ${id}: ${err}`}
            
        }
    }

    async getProductsByCartId(id){
        try{
            const cartDoc = await this.query.doc(id).get()
            const cart = cartDoc.data()
            const products = cart.products
            return {status:"success", payload:products}
        }catch(err){
            return {status:"error", message:err}
        }
    }
    
    async deleteProduct(id, productId){
        try{
            const cartDoc = await this.query.doc(id).get()
            const cart = cartDoc.data()
            const products = cart.products.filter(prod => prod !== productId)
            await this.query.doc(id).set({ products: products})

            return {status:"success", message:`producto ${productId} eliminado del carrito ${id}`}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error al eliminar el  producto ${productId} en carrito ${id}: ${err}`}
            
        }
    }
}

export default CarritosDaoFirebase;

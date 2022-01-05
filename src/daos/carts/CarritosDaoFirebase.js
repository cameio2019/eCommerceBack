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
            const cartDoc = await this.query.doc(id).get()
            const cart = cartDoc.data()
            const products = [...cart.products, productId]
            await this.query.doc(id).set({products})
            return {status:"success", message:`Product added to cart`}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error to add product ${productId} in Cart ${idN}: ${err}`}
            
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

            return {status:"success", message:`product ${productId} deleted at cart ${id}`}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error to delete product ${productId} in Cart ${id}: ${err}`}
            
        }
    }
}

export default CarritosDaoFirebase;

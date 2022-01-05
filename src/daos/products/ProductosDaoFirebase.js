import ContenedorFirebase from "../../containers/ContainerFirebase.js"

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('products')
    }
    //OK
    async addProduct(product){
        try{
            const doc = await this.coleccion.doc()
            let result = await doc.set(product)
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }
    //OK
    async updateProduct(id,body){
        try{
            let doc = await this.coleccion.doc(id)
            const result = await doc.update(body)
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }
}

export default ProductosDaoFirebase;
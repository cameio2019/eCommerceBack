import ContenedorFirebase from "../../containers/ContainerFirebase.js"

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('products')
    }
}

export default ProductosDaoFirebase;
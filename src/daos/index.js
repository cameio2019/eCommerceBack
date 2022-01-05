let productosDao;
let carritosDao;
let persistence = "mongodb";

switch (persistence) {
    case 'fileSystem':
        const {default: ProductosDaofileSystem} = await import('./products/ProductosDaofileSystem.js')
        const {default: CarritoDaofileSystem} = await import('./carts/CarritoDaofileSystem.js')

        productosDao = new ProductosDaofileSystem();
        carritosDao = new CarritoDaofileSystem();
        break;
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./products/ProductosDaoFirebase.js')
        const { default: CarritosDaoFirebase } = await import('./carts/CarritosDaoFirebase.js')

        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        break;
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./products/ProductosDaoMongoDb.js')
        const { default: CarritosDaoMongoDb } = await import('./carts/CarritosDaoMongoDb.js')

        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        break;
}

export { productosDao, carritosDao, persistence }
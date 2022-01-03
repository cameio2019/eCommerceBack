import FileContainer from '../../containers/FileContainer.js';
import __dirname from '../../utils.js';
import fs from 'fs'

export default class CarritoDaofileSystem extends FileContainer{
    constructor(){
        super('carrito.txt')
    }

    async createCart(){
        try{
            let data =await fs.promises.readFile(this.url,'utf-8');
            let nCart=JSON.parse(data);           
            let nId = nCart[nCart.length-1].id+1;            
            if (nCart.some(res=>res.id===nId)){ 
                return {status:"error",message:"Error..Carrito repetido. "}
            }else{
                let timestamp = Date.now();
                let time = new Date(timestamp);
                let cart = {
                    id: nId, 
                    timestamp:time,
                    products:[]
                }                                
                nCart.push(cart);
                try{
                    await fs.promises.writeFile(this.url,JSON.stringify(nCart,null,2));                                        
                    return {status:"success",message:`Carrito creado satisfactoriamente con el ID ${cart.id}`}
    
                }catch(err){
                    return {status:"error",message:"No se pudo crear el carrito solicitado :("}
                }
            }             
        }catch{             
            let timestamp = Date.now();
            let time = new Date(timestamp);
            let cart = {
                id:1,
                timestamp:time,
                products:[]                
            }    
            try {
                await fs.promises.writeFile(this.url,JSON.stringify([cart]),null,2) 
                return {status:"success",message:`Carrito creado satisfactoriamente con el ID ${cart.id}`}
            }catch(err){
                return {status:"error",message:"No se pudo crear el archivo"}
            }
        }
    }

    async deleteById(idNumber){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let carts = JSON.parse(data)
            let index = carts.findIndex(cart => cart.id === idNumber)
            let borrarCart = carts.find(cart => cart.id === idNumber)
            if(index > -1){
                carts.splice(index, 1)
                try{
                    await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2))
                    console.log(`Carrito ${borrarCart.id} eliminado.`)
                    return {status:"success",message:`Carrito ${borrarCart.id} eliminado correctamente.`}
                }
                catch(err){
                    console.log(err)
                    return {status:"error",message:err}
                }
            }else{
                console.log(`Error: no se encuentra ese el id del carrito solicitado.`)
                return {status:"error", message:"Error, no se encuentra el ID solicitado."}
            }
        }catch(err){
            console.log(err)
            return {status:"error", message:"Error al querer eliminar el carrito con ese ID.: "+err}
        }
    }

    async getProductsByCartId(idNumber){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let carts = JSON.parse(data)
            let cartIndex = carts.findIndex(cart => cart.id === idNumber)
            let prodCart = carts[cartIndex].products
            if(prodCart){
                return prodCart
            }else{
                console.log(null)
                return null
            }
        }
        catch(err){
            console.log(err)
        }
    }

    async addProduct(id,id_prod){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let carts = JSON.parse(data)
            let cartIndex = carts.findIndex(cart => cart.id === id)
            let cart = carts.find(cart => cart.id === id)

            let dataProd = await fs.promises.readFile(__dirname + '/files/products.txt', 'utf-8')
            let allProd = JSON.parse(dataProd)
            let productAdd = allProd.find(prod => prod.id === id_prod)
            
            cart.products.push(productAdd)
            carts.splice(cartIndex, 1, cart)

            try{
                await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2))
                return {status:"success", message:`Producto ${id_prod} agregado al carrito ${id}`}
            }
            catch(err){
                return {status:"error", message:`Error al agregar el Producto ${id_prod} en Carrito ${id}: ${err}`}
            }
        }
        catch(err){
            return {status:"error", message:`Error al agregar el Producto ${id_prod} en Carrito ${id}: ${err}`}
        }
    }

    async deleteProduct(idNumber, productId){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let carts = JSON.parse(data)
            let cart = carts.find(cart => cart.id === idNumber)
            let cartIndex = carts.findIndex(cart => cart.id === idNumber)
            
            let productIndex = cart.products.findIndex(prod => prod.id === productId)

            if(productIndex > -1){
                cart.products.splice(productIndex, 1)
                carts.splice(cartIndex, 1, cart)
                try{
                    await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2))
                    console.log(`Producto eliminado del carrito ${cart.id}.`)
                    return {status:"success",message:`Producto eliminado del carrito ${cart.id}.`}
                }
                catch(err){
                    console.log(err)
                    return {status:"error",message:err}
                }
            }
        }
        catch(err){
            return {status:"error",message:err}
        }
    }
}

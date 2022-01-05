import FileContainer from '../../containers/FileContainer.js';
import __dirname from '../../utils.js';
import fs from 'fs'

export default class ProductosDaofileSystem extends FileContainer{
    constructor(){
        super('products.txt')
    }

    async saveChat(message){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let chat = JSON.parse(data)
            chat.push(message)
            await fs.promises.writeFile(this.url, JSON.stringify(chat, null, 2))
            io.emit('messagelog', chat)
        }catch(err){
            try{
                await fs.promises.writeFile(this.url, JSON.stringify([data], null, 2))
                io.emit('messagelog', [message])
            }
            catch(err){
                console.log(`No se pudo escribir el archivo ${err}`)
                return {status:"error", message:"Error al agregar chat "+err}
            }
        }
    }
    
    async save(product){
        try{
            
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let products =  JSON.parse(data)
            
            if(products.some(prod => prod.name === product.name)){
                console.log(`${JSON.stringify(product.name)} El producto ya existe en ${this.archiveName}`)
                return {status:"error", message:"Error, este producto ya existe."}
            }else{
                let data = Object.assign({
                    id: products.length + 1,
                    timestamp: Date.now(),
                    name: product.name,
                    description: product.description || "",
                    code:product.code || "",
                    price: product.price,                                                                                                                                     
                    thumbnail: product.thumbnail,
                    stock: product.stock || 0                                                                                                       
                })
                
                products.push(data)
                try{
                    await fs.promises.writeFile(this.url, JSON.stringify(products, null, 2))
                    console.log(`${product.name} fue agregado a ${__dirname}/files/${this.archiveName}.txt`)
                    return {status:"success", message:"Producto Agregado correctamente."}
                }catch(err){
                    console.log(`No se pudo agregar el producto ${err}`)
                    return {status:"error", message:"Error al agregar producto "+err}
                }
            }
        }
        catch(err){
            let data = Object.assign({
                id: 1,
                timestamp: Date.now(),
                name: product.name,
                description: product.description ||"",
                code:product.code || "",
                price: product.price,                                                                                                                                     
                thumbnail: product.thumbnail,
                stock:product.stock || 0                                                                                                                                                                                   
            })
            try{
                await fs.promises.writeFile(this.url, JSON.stringify([data], null, 2))
                console.log(`Se creó ${this.url} y agregó el ${product.name}`)
                return {status:"success", message:`Se creó ${this.url}.txt y agregó  el ${product.name}`}
            }
            catch(err){
                console.log(err)
                return {status:"error", message:"Error al agregar producto. "+err}
            }
        }
    }
    
    async getById(idNumber){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let products =  JSON.parse(data)
            
            let buscarProd = products.find(prod => prod.id === idNumber)
            
            if(buscarProd){
                return buscarProd
            }else{
                console.log(null)
                return null
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
    
    async getAll(){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let products =  JSON.parse(data)
            return {status:"success", payload:products}
        }
        catch(err){
            // console.log(`No existen los productos en ${__dirname}/files/${this.archiveName}.txt - ${err}`)
        }
    }
    
    async updateProduct(id,body){
        try{
            let data = await fs.promises.readFile(this.url,'utf-8');
            let products = JSON.parse(data);
            if(!products.some(prod => prod.id === id)) return {status:"error", message:"No hay productos con el id solicitado."}
            let result = products.map( product => {
                if(product.id === id){
                        body = Object.assign(body)
                        body = Object.assign({id:product.id,...body});
                        return body;
                }else{
                    return product;
                }
            })
            try{
                await fs.promises.writeFile(this.url,JSON.stringify(result,null,2));
                return {status:"success", message:"Producto actualizado correctamente."}
            }catch{
                return {status:"error", message:"Error al actualizar el producto."}
            }
        }catch(error){
            return {status:"error",message:"Fallo al actualizar producto: "+error}
        }
    }

    async deleteById(idNumber){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let products =  JSON.parse(data)
            
            let index = products.findIndex(prod => prod.id === idNumber)
            let borrarProd = products.find(prod => prod.id === idNumber)

            if(index > -1){
                products.splice(index, 1)
                try{
                    await fs.promises.writeFile(this.url, JSON.stringify(products, null, 2))
                    console.log(`Se eliminó ${borrarProd.title} de ${this.url}.txt`)
                    return {status:"success",message:"Producto eliminado correctamente."}
                }
                catch(err){
                    console.log(err)
                }
            }else{
                console.log(`Error: no existe el producto con el Id solicitado.`)
                return {status:"error", message:"Error: no existe un producto con ese ID."}
            }
            
        }
        catch(err){
            console.log(err)
            return {status:"error", message:"Fallo al eliminar el producto "+err}
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.url, [])
            console.log(`Se eliminó todos los productos de ${this.url}.txt`)
        }
        catch(err){
            console.log(err) 
        }
    }
}
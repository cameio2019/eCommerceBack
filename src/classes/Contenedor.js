import fs from 'fs';
import __dirname from '../utils.js';

const prodUrl = __dirname+'/files/products.txt'

class Contenedor{
    async registrarProd(prod){
        try{
            let data = await fs.promises.readFile(prodUrl,'utf-8');
            let products = JSON.parse(data);
            let id = products[products.length-1].id+1;
            prod =Object.assign({id:id},prod);
            products.push(prod)
            try{
                await fs.promises.writeFile(prodUrl,JSON.stringify(products,null,2));
                return {status:"success",message:"Producto registrado"}
            }catch{
                return {statis:"error",message:"Producto no registrado"} 
            }
        }catch{
            prod = Object.assign({id:1},prod)
            try{
                await fs.promises.writeFile(prodUrl,JSON.stringify([prod],null,2));
                return {status:"success", message:"Producto registrado."}
            }
            catch{
                return {status:"error",message:"Producto no registrado."}
            }
        }
    }
    async getAll(){
        try{
            let data = await fs.promises.readFile(prodUrl,'utf-8');
            let products = JSON.parse(data);
            return {status:"success",payload:products}
        }catch{
            return {status:"error",message:"Error al obtener los productos solicitados."}
        }
    }
    async getProdById(id){
        try{
            let data = await fs.promises.readFile(prodUrl,'utf-8');
            let products = JSON.parse(data);
            let prod = products.find(p => p.id===id)
            if(prod){
                return {status:"success", payload:prod}
            }else{
                return {status:"error",message:"Producto encontrado."}
            }
        }catch{
            return {status:"error",message:"Producto no encontrado."}
        }
    }
    async updateProd(id,body){
        try{
            let data = await fs.promises.readFile(prodUrl,'utf-8');
            let products = JSON.parse(data);
            if(!products.some(prod=>prod.id===id)) return {status:"error", message:"No hay productos con el ID solicitado."}
            let result = products.map(prod=>{
                if(prod.id===id){
                    if(prod){
                        body = Object.assign(body,{title:prod.title, price:prod.price, thumbnail:prod.thumbnail, timestamp: product.timestamp, description: product.description, code: product.code,  stock: product.stock})
                        body = Object.assign({id:prod.id,...body});
                        return body;
                    }
                    else{
                        body = Object.assign({id:id,...body})
                        return body;
                    }
                }else{
                    return prod;
                }
            })
            try{
                await fs.promises.writeFile(prodUrl,JSON.stringify(result,null,2));
                return {status:"success", message:"Producto actualizado."}
            }catch{
                return {status:"error", message:"Error al actualizar el producto."}
            }
        }catch(error){
            return {status:"error",message:"Error al actualizar el producto: "+error}
        }
    }
    async deleteProd(id){
        try{
            let data = await fs.promises.readFile(prodUrl,'utf-8');
            let products = JSON.parse(data);
            if(!products.some(prod=>prod.id===id)) return {status:"error", message:"No se encuentra el ID solicitado."}
            let prod = products.find(p=>p.id===id);
            if(prod){
                try{
                    let prodData = await fs.promises.readFile(prodUrl,'utf-8');
                    let products = JSON.parse(prodData);
                    products.forEach(prod=>{
                        if(prod.id===id){
                            delete prod['prod']
                        }
                    })
                    await fs.promises.writeFile(prodUrl,JSON.stringify(products,null,2));
                }catch(error){
                    return {status:"error", message:"Error al eliminar el producto: "+error}
                }
            }
            let prodtest = products.filter(p=>p.id!==id);
            try{
                await fs.promises.writeFile(prodUrl,JSON.stringify(prodtest,null,2));
                return {status:"success",message:"Producto eliminado."}
            }catch{
                return {status:"error", message:"Producto no eliminado."}
            }
        }catch{
            return {status:"error", message:"Error al eliminar el producto."}
        }
    }

    //Carrito
    //crear carrtio
    async crearCarrito(){
        try{
            let data = await fs.promises.readFile('./files/carrito.txt','utf-8');
            let carts = []
            const cart = {
                id: 1,
                timestamp: Date.now(),
                products: []
            }
            if (data) {
                carts = JSON.parse(data)
                const id = carts.map(c => c.id)
                const maxId = Math.max(...id)
                cart.id = maxId + 1
                // let id = carts[carts.length-1].id+1;
            }
    
            carts = [...carts, cart]
    
            await fs.promises.writeFile('./files/carrito.txt', JSON.stringify([carts], null, 2))
            return { status: 'success', message: `Carrito creado satisfactoriamente con el ID ${cart.id}` }
    } catch (err) {
            console.log(`Create cart error: ${err.message}`)
            return { status: 'error', message: 'Error al crear el carrito.' }
    }
}

    //mostrar el carrito    OK
    async getCarrito(){
        try{
            const data = await fs.promises.readFile('./files/carrito.txt','utf-8');
            let carrs = JSON.parse(data);
            return {status:"success", payload:carrs}
        }catch{
            return {status:"error",message:"Error al obtener el carrito solicitado."}
        }
    }

    //mostrar carrito por ID OK
    async getCarrById(id){
        try{
            let data = await fs.promises.readFile('./files/carrito.txt','utf-8');
            let carrs = JSON.parse(data);
            let carr = carrs.find(c => c.id===id)
            if(carr){
                return {status:"success", payload:carr}
            }else{
                return {status:"error",message:"Carrito no encontrado."}
            }
        }catch{
            return {status:"error",message:"Error al obtener tu carrito."}
        }
    }

    //add al carrito
    async addProd(cid,pid){
        try{
            if (!cid || !pid) throw new Error('Missing \'cartId\' or \'productId\' falta parametro!')
            const productsF = await fs.promises.readFile('src/files/products.txt', 'utf-8')
            if (!products) throw new Error('no se encuentra el producto.')
            const products = JSON.parse(productsF)
            const product = products.find(p => p.id === pid)
            const cartsF = await fs.promises.readFile('src/files/carrito.txt', 'utf-8')
            if (!cartsF) throw new Error('no se encuentra el producto.')
            const aux = JSON.parse(cartsF)
            let carts = JSON.parse(cartsF).filter(c => c.id !== cid)
            const cart = aux.find(c => c.id === cid)
            cart.products = [
                ...cart.products,
                product
            ]
            carts = [
                ...carts,
                cart
            ]
            await fs.promises.writeFile('src/files/carrito.txt', JSON.stringify(carts, null, 2))
            return { status: 'success', payload: 'Producrto agregado  correctamente.' }
        } catch (err) {
            console.log(`Product add error: ${err.message}`)
            return { status: 'error', message: 'Error al agregar el producto.' }
    }

    }

    //actulizar carrito
    async updateCart(id,body){
        try{
            let data = await fs.promises.readFile('./files/carrito.txt','utf-8');
            let carrs = JSON.parse(data);
            if(!carrs.some(carr=>carr.id===id)) return {status:"error", message:"No hay ningún carrito asigando a ese Id."}
            let result = carrs.map(carr=>{
                if(carr.id===id){
                    if(carr.posProd){
                        body = Object.assign(body,{posProd:true,prod:carr.prod})
                        body = Object.assign({id:carr.id,...body})
                        return body
                    }
                    else{
                        body = Object.assign(body,{posProd:false})
                        body = Object.assign({id:carr.id,...body})
                        return body;
                    }
                }else{
                    return carr;
                }
            })
            try{
                await fs.promises.writeFile('./files/carrito.txt',JSON.stringify(result,null,2));
                return {status:"success", message:"Carrito actualizado"}
            }catch{
                return {status:"error", message:"Error al actualizar el carrito (:"}
            }
        }catch{
            return {status:"error",message:"Fallo al actualizar el carrito"}
        }
    }

    //borrar prod por id
    async deleteCarrito(id){
        try{
            let data = await fs.promises.readFile('./files/carrito.txt','utf-8');
            let carrs = JSON.parse(data);
            if(!carrs.some(ca=>ca.id===id)) return {status:"error", message:"No hay ningún carrito con el id dado."}
            let carr = carrs.find(ca=>ca.id===id);
            if(carr){
                try{
                    let cartData = await fs.promises.readFile('./files/carrito.txt','utf-8');
                    let cart = JSON.parse(cartData);
                    cart.forEach(cart=>{
                        if(cart.id===id){
                            delete cart['id']
                        }
                    })
                    await fs.promises.writeFile('./files/carrito.txt',JSON.stringify(cart,null,2));
                }catch{
                    return {status:"error", message:"Fallo al eliminar el carrito."}
                }
            }
            let aux = cart.filter(pr=>pr.id!==id);
            try{
                await fs.promises.writeFile('./files/carrito.txt',JSON.stringify(aux,null,2));
                return {status:"success",message:"Carrito eliminado"}
            }catch{
                return {status:"error", message:"No se pudo eliminar el carrito."}
            }
        }
        catch{
            return {status:"error",message:"Error al eliminar el carrito."}
        }
    }
}

export default Contenedor;
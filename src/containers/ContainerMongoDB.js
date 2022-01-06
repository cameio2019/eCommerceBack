import mongoose from 'mongoose'
import config from '../config/db.js'

await mongoose.connect(config.mongodb.baseUrl, config.mongodb.options)

export default class ContenedorMongoDb{
    constructor(collection, schema, timestamps) {
        this.coleccion = mongoose.model(collection,new mongoose.Schema(schema,timestamps))
    }

    async getById(id) {
        try {
            // const docs = await this.coleccion.find({ '_id': id })
            // if (docs.length == 0) {
            //     throw new Error('Error al listar por id: no encontrado')
            // } else {
            //     const result = renameField(asPOJO(docs[0]), '_id', 'id')
            //     return result
            // }
            let document = await this.collection.findById(id)
            
            if(document){
                return {status:"success", payload: document}
            }else{
                console.log(null)
                return {status:"error", error: 'Objecto no encontrado.'}
            }
            
        
        } catch (error) {
            return{status:"error", error:`No se pudo obtener el Objeto con id:${id} en ${this.url} - ${error}`}
        }
    }

    getAll = async() =>{
        try {
            let docs = await this.coleccion.find()
            return {status:"success", payload:docs}
        } catch (error) {
            return {status:"error",error:error}
        }
    }

    async save(product) {
        // try {
        //     let doc = await this.coleccion.create(product);
        //     doc = asPOJO(doc)
        //     renameField(doc, '_id', 'id')
        //     removeField(doc, '__v')
        //     return doc
        // } catch (error) {
        //     throw new Error(`Error al guardar: ${error}`)
        // }
        try{
            let result = await this.collection.create(product)
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async updateProduct(nuevoElem) {
        try {
            renameField(nuevoElem, 'id', '_id')
            const { n, nModified } = await this.coleccion.replaceOne({ '_id': nuevoElem._id }, nuevoElem)
            if (n == 0 || nModified == 0) {
                throw new Error('Error al actualizar: no encontrado')
            } else {
                renameField(nuevoElem, '_id', 'id')
                removeField(nuevoElem, '__v')
                return asPOJO(nuevoElem)
            }
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            await this.collection.deleteOne({"_id": id})
            return{status:"success", mesagge:`El id:${idNumber} fue eliminado.`}
            
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({})
            return{status:"success", mesagge:`Todos los elementos fueron eliminados`}
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}


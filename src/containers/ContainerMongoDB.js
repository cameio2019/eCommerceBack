import mongoose from 'mongoose'
import config from '../config/db.js'
// import { asPOJO, renameField, removeField } from '../services/objectUtils.js'

await mongoose.connect(config.mongodb.baseUrl, config.mongodb.options)

export default class ContenedorMongoDb{

    constructor(collection, schema, timestamps) {
        this.coleccion = mongoose.model(collection,new mongoose.Schema(schema,timestamps))
    }

    async getById(id) {
        try {
            const docs = await this.coleccion.find({ '_id': id })
            if (docs.length == 0) {
                throw new Error('Error al listar por id: no encontrado')
            } else {
                const result = renameField(asPOJO(docs[0]), '_id', 'id')
                return result
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    getAll = async() =>{
        try {
            let docs = await this.coleccion.find()
            return {status:"success",payload:docs}
        } catch (error) {
            return {status:"error",error:error}
        }
    }

    async save(product) {
        try {
            let doc = await this.coleccion.create(product);
            doc = asPOJO(doc)
            renameField(doc, '_id', 'id')
            removeField(doc, '__v')
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
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
            const { n, nDeleted } = await this.coleccion.deleteOne({ '_id': id })
            if (n == 0 || nDeleted == 0) {
                throw new Error('Error al borrar: no encontrado')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await this.coleccion.deleteMany({})
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}


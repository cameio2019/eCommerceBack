import admin from "firebase-admin"
import config from '../config/db.js'


admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL:"https://backcoderhouse.firebaseio.com"
})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(query) {
        this.coleccion = db.collection('products'),
        this.query = query
    }

    async getById(id) {
        try {
        //     const doc = await this.coleccion.doc(id).get();
        //     if (!doc.exists) {
        //         throw new Error(`Error al listar por id: no se encontró`)
        //     } else {
        //         const data = doc.data();
        //         return { ...data, id }
        //     }
        // } catch (error) {
        //     throw new Error(`Error al listar por id: ${error}`)
        // }
        // const doc = this.coleccion.doc(id)
        // let document = await doc.get(id)
        // if(document.data()){
        //     return {status:"success", payload: document.data()}
        // }else{
        //     console.log(null)
        //     return {status:"error", error: 'Objetos no encontrados.'}
        // }

        const docRef = this.collection.doc(id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {status: "success", payload: docSnap.data()}
        } else {
            return {status:"error", message: "no se encontró el id"}
        }
    }
    catch(err){
        return{status:"error", error:`No se puede obtener el Producto con id:${id} en ${this.url} - ${err}`}
    }
}

//OK
    async getAll() {
        try {
            const result = []
            const currentCollection = await this.coleccion.get();
            currentCollection.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar todos los Productos: ${error}`)
        }
    }

    async save(nuevoElem) {
        try {
            const saved = await this.coleccion.add(nuevoElem);
            return { ...nuevoElem, id: saved.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    // async updateProduct(nuevoElem) {
    //     try {
    //         const updated = await this.coleccion.doc(nuevoElem.id).set(nuevoElem);
    //         return updated
    //     } catch (error) {
    //         throw new Error(`Error al actualizar: ${error}`)
    //     }
    // }

    async deleteById(id) {
        try {
            // const item = await this.coleccion.get(id).delete(id);
            // return item
            this.coleccion.get(id).then( result => {
                result.forEach(del => {
                    del.ref.delete()
                })
            })
                return{status:"success", mesagge:`Todos los Productos fueron eliminados.`}
        } catch (error) {
            throw new Error(`Error al eliminar: ${error}`)
        }
    }

    //OK
    async deleteAll() {
        try {
            this.coleccion.get().then( result => {
                result.forEach(del => {
                    del.ref.delete()
                })
            })
                return{status:"success", mesagge:`Todos los Productos fueron eliminados.`}
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async desconectar() {
    }
}

export default ContenedorFirebase;
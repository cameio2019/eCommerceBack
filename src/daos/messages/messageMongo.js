import { normalize, denormalize, schema } from "normalizr"
import mongoose from "mongoose"

mongoose.connect("mongodb+srv://admineze:UMC2yam.bqa2wdp8pkt@ecommercecoderhosuse.8sh6m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

export default class MessageMongo {
    constructor () {
        this.collection= mongoose.model("messages", mongoose.Schema({
            author:{
                id:{type:String,required:true},
                nombre:{type:String,required:true},
                apellido:{type:String,required:true},
                edad:{type:Number,required:true},
                alias:{type:String,required:true},
                avatar:{type:String,required:true},
            },
            text:{type:String,required:true},
            time:{type:String,required:true},
            id: {type:Number}
        }))
    }

    registerMessage = async (message)=> {
        try {
            await this.collection.create(message)
            let data = await this.collection.find() 

            let id=1
            for (let message of data) {
                message.id=id
                id++
            } 
            const initialData= {
                "id": "chatLog1",
                "mensajes": JSON.parse(JSON.stringify(data))
            }
            const authorSchema= new schema.Entity("autores")
            const messageSchema= new schema.Entity("mensajes",{
                author: authorSchema
            })
            const chatSchema= new schema.Entity("chatLogs",{
                mensajes: [messageSchema]
            })
            const normalizedData= normalize(initialData,chatSchema)

            return {status:"success", message:"mensaje agregado", payload: normalizedData}
        } catch (err) {
            console.log(err)
            return {status:"error", message: err}
        }
    }
    
    getMessages = async ()=> {
        try {
            let data = await this.collection.find()

            let id=1
            for (let message of data) {
                message.id=id
                id++
            } 
            const initialData= {
                "id": "chatLog1",
                "mensajes": JSON.parse(JSON.stringify(data))
            }
            const authorSchema= new schema.Entity("autores")
            const messageSchema= new schema.Entity("mensajes",{
                author: authorSchema
            })
            const chatSchema= new schema.Entity("chatLogs",{
                mensajes: [messageSchema]
            })
            const normalizedData= normalize(initialData,chatSchema)

            return {status:"success", message:"mensajes encontrados", payload: normalizedData}
        } catch (err) {
            console.log(err)
            return {status:"error", message: err}
        }
    }

    clearLog= async ()=> {
        try {
            await this.collection.deleteMany({_id:{$ne:null}}) 
            const messages = await this.collection.find()
            return {status:"success", message:"mensajes borrados", payload:messages}
        } catch (err) {
            console.log(err)
            return {status:"error", message: err}
        }
    }
}
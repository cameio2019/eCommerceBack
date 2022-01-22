import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://admineze:UMC2yam.bqa2wdp8pkt@ecommercecoderhosuse.8sh6m.mongodb.net/ecommerce?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

export default class UsersMongo {
    constructor() {
        this.collection= mongoose.model("users", mongoose.Schema({
            id: {type:String,required:true},
            name: {type:String,required:true},
            last_name: {type:String,required:true},
            age: {type:Number,required:true},
            alias: {type:String,required:true},
            avatar: {type:String,required:true},
            password: {type:String,required:true}
        },{
            timestamps: true
        }))
    }

    registerUser = async (userData)=> {
        try {
            let users = await this.collection.find()
            if (users.find(user=> user.id == userData.id)) {
                return {status:"error", message: "El usuario ya existe."}
            } else {
                let result = await this.collection.create(userData)
                return {status:"success", message: "Usuario registrado exitosamente.", payload: result}
            }
        } catch(err) {
            return {status:"error", message: err}
        }
    }

    getUserById = async (id)=> {
        try {
            let search = await this.collection.find({id:id})
            if (search.length>0) {
                return {status:"success", message: "Usuario encontrado.", payload: search}
            } else {
                return {status:"error", message: "Usuario o contraseña incorrecta. Por favor intenatalo neuvamente."}
            }
        } catch (err) {
            console.log(err)
            return {status:"error", message: err}
        }
    }
}
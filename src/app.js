import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import Contenedor from './classes/Contenedor.js';
import productsRouter from './routes/products.js';
import carritoRouter from './routes/carrito.js';
import upload from './services/uploader.js';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import { authAdmin}  from './utils.js'
import Mensajes from './daos/messages/messageMongo.js'
import Usuarios from './daos/users/uersMongo.js'
import session from "express-session";
import MongoStore from "connect-mongo";
import ios from 'socket.io-express-session'

const app = express();
const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor();
const expires = 600

const server = app.listen(PORT,()=>{
    console.log("Listening on port: ",PORT)
})
export const io = new Server(server);
const mensajes = new Mensajes()
const users = new Usuarios()
// io.use(ios(baseSession))

app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://admineze:UMC2yam.bqa2wdp8pkt@ecommercecoderhosuse.8sh6m.mongodb.net/sessions?retryWrites=true&w=majority",
        ttl:600
    }),
    secret:"pa$$word",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: expires * 1000 }

}))

const admin = true;
app.engine('handlebars',engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    req.auth = admin;
    next();
})
app.use(express.static(__dirname+'/public'));
app.use('/images', express.static(__dirname+'/public'));
app.use('/api/products',productsRouter);
app.use('/api/carrito',carritoRouter);

app.post('/api/uploadfile',upload.fields([
    {
        name:'file', maxCount:1
    },
    {
        name:"documents", maxCount:3
    }
]),(req,res)=>{
    const files = req.files;
    console.log(files);
    if(!files||files.length===0){
        res.status(500).send({messsage:"No se subió el archivo."})
    }
    res.send(files);
})


app.get('/view/products',authAdmin, (req,res)=>{
    contenedor.getAll().then(result=>{
        // let data = result.payload;
        let preparedObject ={
            products : result
        }
        res.render('products',preparedObject)
    })
})

app.get("/",async function (req,res) {
    res.render("Home")
})

app.get("/logout", (req,res)=> {
    alert(`Hasta luego ${req.session.user.userId}`)
    req.session= null   
})

app.get("/currentUser", async (req,res)=> {
    console.log("user: ", req.session.user)
    res.send(req.session.user)
})

app.post("/registerUser", async (req,res)=> {
    let userData = req.body
    let result = await users.registerUser(userData)
    res.send(result)
})

app.post("/login", async (req,res)=> {
    console.log(req.body)
    let {id, password} = req.body
    if (!id || !password) return res.status(400).send({message:"datos incompletos"})
    let search = await users.getUserById(id)
    if (!search.payload) return res.status(404).send(search)
    else if (search.payload[0].password !== password) return res.send({status:"error", message:"usuario o contraseña incorrecta"})
    req.session.user = {
        userId: search.payload[0].id,
        userName: search.payload[0].name
    }
    res.send({status:"success", message: `usuario ${req.session.user.userId} logueado`})
})
//socket
// io.on('connection', async socket=>{
//     console.log(`El socket ${socket.id} se ha conectado`)
//     let products = await contenedor.getAll();
//     socket.emit('getProd',products);
// })

//chat
const chatContainer = new Contenedor('chat')
// let messages = [];

// io.on('connection',socket=>{
//     console.log(`Cliente ${socket.id} se ha conectado`)
//     socket.emit('messlog',messages);
//     socket.on('message',data=>{
//         messages.push(data)
//         io.emit('messlog',messages);
//     })
// })

io.on('connection', async socket => {
    console.log(`El Cliente ${socket.id} conectado.`)
    let products = await contenedor.getAll()
    socket.emit('getprod', products)
    
    socket.emit('messagelog', await chatContainer.getAll())

    socket.on('message', async data => {
        const user = await users.getUserById(socket.handshake.session.user.userId)
        let time= moment()
        let message = {
            author: {
                id: user.payload[0].id
            },            
            text: data.message,
            time: time.format("DD/MM/YYYY HH:mm")
        }
        mensajes.registerMessage(message).then(result => {
            io.emit("messagelog",result)
        })   
    })
    socket.on("clearLog", ()=> {
        mensajes.clearLog().then(result=> {
            io.emit("messagelog",result)
        })
    })
})

app.use('/*', (req,res)=> res.send({
    error:-2,
    description: `Endpoint ${req.originalUrl}  y metodo ${req.method} NO implementado.`
}))
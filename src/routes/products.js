import express from 'express';
import Contenedor from '../classes/Contenedor.js';
import upload from '../services/uploader.js';
import {io} from '../app.js';
import { authAdmin }  from '../utils.js'

const router = express.Router();
const contenedor  = new Contenedor('products');

//GETS OK
router.get('/',(req,res)=>{
    contenedor.getAll().then(result=>{
        res.send(result);
    })
})

router.get('/id?', (req, res) => {
    let pid = parseInt(req.query.id)
    contenedor.getById(pid)
    .then(result=>{
        if(result !== null){
            res.send(result);
        } else{
            res.send({ error : 'producto no encontrado' })
        }
    })
})

router.get('/:pid', (req, res) => {
    let id = parseInt(req.params.pid);
    contenedor.getById(id)
    .then(result=>{
        if(result !== null){
            res.send(result);
        } else{
            res.send({ error : 'Producto no encontrado.' })
        }
    })
})

//POSTS OK
router.post('/',upload.single('thumbnail'),authAdmin,(req,res)=>{
    let file = req.file;
    let prod = req.body;
    prod.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename;
    contenedor.save(prod).then(result=>{
        res.send(result);
        if(result.status==="success"){
            contenedor.getAll().then(result=>{
                console.log(result);
            io.emit('getProd',result);
            })
        }
    })
})

//PUT OK
router.put('/:pid', authAdmin, (req,res) => {
    let body = req.body;
    let id = parseInt(req.params.pid)
    contenedor.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//DELETES OK
router.delete('/:pid', authAdmin,(req,res)=>{
    let id= parseInt(req.params.pid);
    contenedor.deleteById(id).then(result=>{
        res.send(result)
    })
})

// router.delete('/', authAdmin,(req,res)=>{
//     contenedor.deleteAll().then(result=>{
//         res.send(result)
//     })
// })

export default router;
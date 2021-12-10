import express from 'express';
import Contenedor from '../classes/Contenedor.js';
const router = express.Router();
const contenedor  = new Contenedor();


//log
router.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Petición realizada a las: '+time.toTimeString().split(" ")[0])
    next()
})
//GETS
router.get('/',(req,res)=>{
    contenedor.getCarrito().then(result=>{
        res.send(result);
    })
})
router.get('/:cid',(req,res)=>{
    let id = parseInt(req.params.id);
    contenedor.getCarrById(id).then(result=>{
        res.send(result);
    })
})

//POSTS crear carrito
router.post('/',(req,res)=>{
    let carr = req.body;
    console.log(carr);
    contenedor.crearCarrito(carr).then(result=>{
        res.send(result);
    })
})

//POST add prod al carrito
router.post('/:id/products/:pid', (req, res) => {
    const cid = Number(req.params.id)
    const pid = Number(req.params.pid)
    contenedor.addProd(cid, pid).then(result => {
        if (result.status === 'success') res.status(200).json(result)
        else res.status(500).send(result)
    })
})

// //PUTS 
// router.put('/:cid/products',(req,res)=>{
//     let body = req.body;
//     let id = parseInt(req.params.cid);
//     contenedor.updateCart(id,body).then(result=>{
//         res.send(result);
//     })
// })
//DELETE
router.delete('/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    contenedor.deleteCarritoId(id).then(result=>{
        res.send(result)
    })
})

router.delete('/:cid/products/:pid', (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.params.productId)
    contenedor.deleteProd(cartId, productId).then(result => {
        if (result.status === 'success') res.status(200).json(result)
        else res.status(500).send(result)
    })
})

export default router;
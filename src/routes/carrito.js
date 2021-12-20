import express from 'express';
import CarritotContainer from '../classes/CarritotContainer.js';
const router = express.Router();
const contenedor  = new CarritotContainer();


//log
router.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Petición realizada a las: '+time.toTimeString().split(" ")[0])
    next()
})
//GETS
// router.get('/',(req,res)=>{
//     contenedor.getCarrito().then(result=>{
//         res.send(result);
//     })
// })
// router.get('/:id',(req,res)=>{
//     let id = parseInt(req.params.id);
//     contenedor.getCarrById(id).then(result=>{
//         res.send(result);
//     })
// })
//OK
router.get('/:cid/products',(req,res)=>{
    let id = parseInt(req.params.cid);
    contenedor.getProductsByCartId(id).then(result=>{
        res.send(result);
    })
})

//POSTS crear carrito OK
router.post('/', (req, res) => {
    contenedor.createCart()
    .then(result => res.send(result))
    console.log()
})

//POST add prod al carrito OK
router.post('/:cid/products/', (req, res) => {
    let cartId = parseInt(req.params.cid)
    let productId = parseInt(req.body.id)
    contenedor.addProduct(cartId, productId)
    .then(result => res.send(result))
})

// //PUTS 
// router.put('/:cid/products',(req,res)=>{
//     let body = req.body;
//     let id = parseInt(req.params.cid);
//     contenedor.updateCart(id,body).then(result=>{
//         res.send(result);
//     })
// })

//DELETE OK
router.delete('/:cid',(req,res)=>{
    let id = parseInt(req.params.cid)
    contenedor.deleteById(id)
    .then(result => res.send(result))
})

router.delete('/:cid/products/:pid', (req, res) => {
    let cartId = parseInt(req.params.cid)
    let prodId = req.params.pid
    contenedor.deleteProduct(cartId, prodId)
    .then(result => res.send(result))
})


export default router;
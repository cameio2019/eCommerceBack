import {fileURLToPath} from 'url';
import {dirname} from 'path';

const filename= fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authAdmin = (req,res,next)=>{
    if(!req.auth) res.status(403).send({error:-2,message:"NO se encuentra autorizado."})
    else next();
}

function makeId() {
    let id= ""
    let characters = [ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890]
    for (i=0; i<7; i++) {
        id += characters[Math.floor(Math.random() * characters.length)]
    }
    return id
}

export default __dirname;
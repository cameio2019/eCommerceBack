import __dirname from '../utils.js'
// // import config from '.'
// import * as path from "path";
// import dotenv from 'dotenv'
// dotenv.config()

export default {
fileSystem: {
    baseUrl:__dirname+'/files/'
},
mongodb: {
    baseUrl: 'mongodb+srv://admineze:UMC2yam.bqa2wdp8pkt@ecommercecoderhosuse.8sh6m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: false,
        // serverSelectionTimeoutMS: 5000,
    },
},
firebase: {
    "type": "service_account",
    "project_id": "backcoderhouse",
    "private_key_id": "process.env.PRIVATE_KEY_ID",
    "private_key": "process.env.PRIVATE_KEY",
    "client_email": "process.env.CLIENTEMAIL",
    "client_id": "process.env.CLIENTID",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nai02%40backcoderhouse.iam.gserviceaccount.com"
},
};
import * as path from "path";

export default {
// fileSystem: {
//     productsPath: path.resolve(__dirname, "../data", "products.txt"),
//     cartsPath: path.resolve(__dirname, "../data", "carito.txt"),
// },
mongodb: {
    cnxStr: 'mongodb://localhost:27017/ecommerce',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: false,
        serverSelectionTimeoutMS: 5000,
    },
},
firebase: {
    "type": "service_account",
    "project_id": "backcoderhouse",
    "private_key_id": "de2161f9c54506cb372df52d04bae2e5f5bb488b",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCP4x0yijaVH342\n0qNVIGxouGL4vm2pTbpU7SQ09DD3KJQiDs2Jx+7+1dsBwztiGtRL2pyfJMO9zRut\nMAj9KCZY3THtn8oKFBZOC9UR6B12ZM16q4N4klDNspGW5CsEJyyiESTP5AH8aePH\nJKtSPPMuzrDahtt50Cvx7g77tL9lsthlTcyj97S94ktv9UiNA04h0EhCLU7aXke0\ni36kYAabJHGAga72oCoYnfDSGdkrQctdp1VGiljNIeZx+lIfNyfqg+E1JQ6obqVo\nFfR3tU5YnG72xcV8C/TF8xg96B4L5kiYMm1F20GfDK5WiLMgcVriGWnPbbwB9W2G\nsRZwwVidAgMBAAECggEAJs9el7w5/r0Q4R6tmY92TkS1xVwv3gOuJ6wTIQlgj7nt\nQsZ1YB2CdFAgk3gic1LDQnaD2lUjSvWg6nTTZ91FgqCfD/YSm+dRINoGLZ9LGx0T\nY2wRuRrWGrV4mZePlr4uRsSTBlP8ySWSn6tfXn48JbrwbvEDD/c7czT/65qUKYzN\nN7qcYUpF0gaAJ2kJ9P/7xE/DmKd+Crg6lxONFghTUb7WgnHPQHYGwmGYezfAwg5X\nQwfoGIPikzuo3J7wTEfjHO7bS/2WqD3U7B0wnwsJHa1ptmA/N62EJ/SewdgvKVoa\nDhsG4lqr0YgJhXHo9EN9dKQZhrozkqO3MoTuqEmarQKBgQDIuh8ITgyF1RCkG+BJ\ni07E6I3OeUDqejVl1nnypl/RMg3rU8PWAJzYw2W8m+gI4VQkSY/Vqi0A8xMiK2yH\n+eh3zWdmvi7kjgN2eNMEPFJyUvImhaEeRNxtO6me6fGEtk6EazHA9XfomKZ/nmX+\nFnafwnjCg7S1kECDm0n6Bo7x+wKBgQC3giv/0KUeBN26phsWd5NrOhs+vDxd2wlO\njRjboqCXvi64UnoxCYQtG3W2HmleBx75XEDuD0QOXjBdIUtY0fXR8k13zV0JMBdf\ngiMjuhhRXDeM2A20d8At1Mz2Bs2zkXGKy3M2TvJBK4iIhAmIEc7L3Oo8DvICA9Ot\nE6z0oRv0RwKBgFJ8ygvrpxHIgVIvcnhGm1QoDT5wbdDt78ut2+dvn6ikXTv77Fqh\nXdNmWQStPSmJD77pzAYOLPha69364lruxC2XZ4q9VR/vjFS/SlhPQcJhe8mA2LlL\nqxnojsgTc4EKOjIIqyWUunYHZUTEnz1PlegJTv8AiN6kLR7oTfpFf7DJAoGAbtL7\ndYvxHBb+PYmxVDk0244FBDc0Ec6FaV4HBCXL7LhbiM+uoczIeWFbDniBU9rjFt9j\nCyJHDJJPjP7dfS+X0IoPxOlOZY0YoIJ8bEgoBYK2vaWBaVrkwgkBGxfyxJ5yvsqt\nsr+syDTdSOzMwNNYW3/4KfswpozfGmiGjFp8AmMCgYAa1pBcVMWv+oWpU7baKb1G\nT3R4Dt5P3P2B5AAxDSM+GL4ueHeCNSwyNvQnrkJEZK6/ohhy7utEk+NlpbdOYVFO\nS/ntbWG0ods0lnyG0WTpzGS+Ljq43n4bM8Sw9lbmf3Zf0ElkgQf/lDdFkdAV8Duk\nuj8pMmy2DEAC0qK78+PC3w==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-nai02@backcoderhouse.iam.gserviceaccount.com",
    "client_id": "113165751874901302767",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nai02%40backcoderhouse.iam.gserviceaccount.com"
},
};
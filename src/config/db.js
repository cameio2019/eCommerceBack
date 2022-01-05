import __dirname from '../utils.js'
// // import config from '.'
// import * as path from "path";
import dotenv from 'dotenv'
dotenv.config()

export default {
fileSystem: {
    baseUrl:__dirname+'/files/'
},
mongodb: {
    baseUrl: `mongodb+srv://admineze:UMC2yam.bqa2wdp8pkt@ecommercecoderhosuse.8sh6m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
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
    "private_key_id": "1653bf9fd6d74a0704770d1c6e2a6a56dac08e56",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtmfc3If/GjW1q\n0KEh+VxdPx4suvALbGdJ+Rf/QRhvvsfcF0FxXkxq3f1oo8zPzgn+5tuz54m0Pxgj\nKqg43CMzvNN87ZCzi07t5+UnOj+dNIJX9HxezspDnoWGo9C3b/E8ZWadMmI0dcZL\nx5faN4NFQC8EyGvRCX3Gfn2eQFHAqGsPZipx+BJCVXPI4bDfvRLYfvYeckd/6AG/\nZXFtOAMOEpsM3ZXAg8c1V5AAH/QqxnVkGME9y8DwSkOb3AGdD1vZFAkpCsxSruqP\ngfRyRKXLExVtwFpyCgxlRjDNgsQ/kWYUcm+a4/JZHlUCbJo51j89dywf3sIoP9i2\nge0zCC9ZAgMBAAECggEAKUqJxo9LqwpQkCt3aAFLutIcdz8vgUgTeUDKOGhfS5Tx\nLKRLaI+pVXHfqFftiy/SqNJ4R143HqwzLYoj4QJbTR8InppS5KGp8GRL2Py9zMKE\nji8Utegxq8u0rsWgC0GQ+3CS66jkOt4YgEXFFJ5Hlt0hUd3p5xp+1AuaDV33E/+W\nFUKDvhu8woWshqHTnt9/XBDvpzKWOs92E/8klQWRmlBwbnsVC7bFS1gdXSbAw9wy\n0vBH27Noj+MUebnLOCnZLpPMx+e4+mirtP9jLhrXGMpq786RJXySHdB24SsIbpua\ng9u9ma9FQCJVFu67OaGk78S4hcnlwKOkGa2P7GaDEQKBgQDtsS6zFuz8tgMdW3K9\n11xuc+ix0jDc/053ofamQbpDVAWGgRxMYWZewHphwHrPR4UGqV3cDqYhgXCAE9k5\noz8FrLWGk8Vtit91nfmK2iTSnQfb6o8ph1BFIBJaX9nfW9NXepfiXMEU7zq57i6T\nk4H27Z/FcwH7BW2SuAQndnWEIwKBgQC6+Qq2vN3XXedGqA6smZIBa1ktodCZpVv4\n0GwXPO4J1CmtOxgB2mvC8doU3vH4xAlJsYxGJSyEHeytUHbXtayUDDrZoRZSESko\nH2aDQVAF1YhOTNctkNTZjyD5BWA2hGxiTQXzLDAm7qiYO8qi27jhN/fZEZfwzvnf\njy64GzHIUwKBgQDGfGoZ5TAbS8bIEiB8BUZLegE71OE2+v/EiPyWE1b+eEBw9In0\nAnXg8+x+iqRDSV79lBsr8xOp8RRH78s7BWZQT8v6SJXaBtjZuAS1fbq4Iad5bqME\nM9nFD6Yjz9z5Vw3iBB6nSXt3BtrMfuhoFgq2b/I2iPaDbyH0HjRh29sAbwKBgAfk\nJu2bfwlt7yruQOBMAvuIWlUwtSsm7YDM2yMH8Uv85l1nVxYM7+tkZb3nwvKq43F2\nyuLTAtP4p1qRQNLN2iDNe1ZgFB8WllQZLyxu/z+fyYb0e0hzCmi8P7oC3hKu+BwW\nACBJRyb9f6QdMeo5t83ZnN5OfckuEyG6W1Bt5WX9AoGAeTrfjxKkp6azzqXHH5Fj\n+zQ+JjyqmM0gGv9oFC91EoKXGGzUgTYoeyWQUp+UdHkHhAVW7R2a1dy39GV00ABi\n1cnytQCMfvRpd0qq2CR3ZpL8tKOQdaYQbgR5hcLx2XddotbWk6vtR1ufM1GTCZtK\nMb2h6QgiiE3paIFADfL2W4U=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-nai02@backcoderhouse.iam.gserviceaccount.com",
    "client_id": "113165751874901302767",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nai02%40backcoderhouse.iam.gserviceaccount.com"
},
};
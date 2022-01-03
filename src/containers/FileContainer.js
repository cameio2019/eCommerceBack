import fs from 'fs';
import config from '../config/db.js'

export default class FileContainer{
    constructor(file_endpoint){
        this.url = `${config.fileSystem.baseUrl}${file_endpoint}`
    }
}



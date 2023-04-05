const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'; 
        //Conectar a la base de datos
        this.conectionDB()
        //Middlewares
        this.middlewares()
        //Rutas de mi aplicacion
        this.routes()
    }

    async conectionDB(){
        await dbConnection();
    }

    middlewares(){
        //Entro a la carpeta app y luego el '.use' te de dice que es un middlewares
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }
        
    listen(){
        this.app.listen(this.port,() =>{
            console.log('Servidor corriendo en el puerto,', this.port)
        })
    }
}
module.exports = Server;
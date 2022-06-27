const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();


const { dbConnection } = require('../database/config');

class Server {

    // Constructor por defecto
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            user: '/api/user',
            uploads: '/api/uploads'
        }

        // Conectar a base de datos
        this.connectDB();

        // Middlewares -> Intermediarios en el server y el router/controller
        this.middlewares();

        // Rutas
        this.routes();
    }

    // Metodos
    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico -> Express consume los documentos html de este directorio
        this.app.use(express.static('public'));

        // FileUpload -> Carga de archivos - express-fileupload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }


    routes() {
        // Middleware condicionado
        this.app.use(this.paths.auth, require('./../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('./../routes/buscar.routes'));
        this.app.use(this.paths.categorias, require('./../routes/categorias.routes'));
        this.app.use(this.paths.productos, require('./../routes/productos.routes'));
        this.app.use(this.paths.user, require('./../routes/user.routes'));
        this.app.use(this.paths.uploads, require('./../routes/uploads.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`RestServer -> ok :: port: ${this.port}`.blue);
        });
    }

}






module.exports = Server;

// Cors -> protege el servidor y los endpoints, muchos navegadores web dan errores si no lo tenemos configurado
// Postman -> se salta el cors 
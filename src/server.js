const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const { v4 } = require('uuid');
const { format } = require('timeago.js');

//Routes
const imagesRoutes = require('./router/images.routes');

class Server {

    constructor() {
        this.app = express();
        this.Config();
        this.Routes();
        this.Start();
    }

    Config() {
        //
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('views', path.resolve(__dirname, 'views'))
        //View Engine
        this.app.set('view engine', 'ejs');
        this.app.use(morgan('dev'));
        //Middlewares
        const storage = multer.diskStorage({
            destination: path.join(__dirname,'public/img/uploads') ,
            filename: (req, file, cb, filename) => {
                cb(null, v4() + path.extname(file.originalname));
            }
        });
        this.app.use(multer({
            //dest: path.join(__dirname, 'public/img/uploads')
            storage
        }).single('image'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        //Global Variables
        this.app.use((req,res,next)=>{
            this.app.locals.format = format;
            next();
        })
        //Static Files
        this.app.use(express.static(path.resolve(__dirname, 'public')));
    }

    Routes() {
        this.app.use(imagesRoutes);
    }

    Start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get('port'));
        })
    }

}

const server = new Server();
module.exports = server.app;
const { Router } = require('express');

//Controller
const {
    getImages,
    getOneImage,
    saveImage,
    deleteImage
} = require('../controllers/images.controller');

class ImagesRoutes {

    constructor() {
        this.router = Router();
        this.Routes();
    }

    Routes() {
        this.router.get('/', (req, res) => {
            res.render('pages/index')
        });
        this.router.get('/images', getImages)
        this.router.get('/upload', (req, res) => {
            res.render('partials/upload');
        });
        this.router.post('/upload', saveImage)
        this.router.get('/image/:id', getOneImage);
        this.router.get('/image/delete/:id', deleteImage)
    }

}

const imagesRoutes = new ImagesRoutes();
module.exports = imagesRoutes.router;
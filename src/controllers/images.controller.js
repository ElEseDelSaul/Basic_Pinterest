const { unlink } = require('fs-extra');
const path = require('path');
const imageCtrl = {}

//Model
const Image = require('../models/Image');

imageCtrl.saveImage = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { filename } = req.file;
        const path = '/img/uploads/' + filename;
        const newImage = new Image({ title, description, filename, path });
        await newImage.save();
        //console.log(newImage);
        console.log('Image Uploaded')
        res.redirect('/images');
    } catch (err) {
        console.log(err);
    }
}

imageCtrl.getImages = async (req, res) => {
    try {
        const images = await Image.find().sort({created_at:-1});
        res.render('partials/images', { images });
    } catch (err) {
        console.log(err)
    }
}

imageCtrl.getOneImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findById(id);
        res.render('partials/profile', { image })
    } catch (err) {
        console.log(err);
    }
}

imageCtrl.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByIdAndRemove(id);
        await unlink(path.resolve('./src/public/' + image.path));   //Eliminar imagen en uploads
        console.log('Image deleted');
        res.redirect('/images');
    } catch (err) {
        console.log(err)
    }
}

module.exports = imageCtrl;
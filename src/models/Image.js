const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    created_at: { type: Date, default: Date.now() }
})

module.exports = model('Image', imageSchema);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const stickerSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    description: {
        type: mongoose.SchemaTypes.String,
        default: ''
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    qty: {
        type: mongoose.SchemaTypes.Number,
        default: 0
    },
    mainImg: {
        type: mongoose.SchemaTypes.String,
        default: 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png'
    },
    images: [{
            type: mongoose.SchemaTypes.String,
            default: []
    }],
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        default: []
    }],
    tags: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Tag',
        default: []
    }],
    createdOn: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now()
    },
    isActive: {
        type: mongoose.SchemaTypes.Boolean,
        default: true
    }
});

const Sticker = mongoose.model('Sticker', stickerSchema);

module.exports = Sticker;
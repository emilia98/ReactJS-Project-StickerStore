const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const categorySchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    slug: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    createdOn: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now()
    },
    isActive: {
        type: mongoose.SchemaTypes.Boolean,
        default: true
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
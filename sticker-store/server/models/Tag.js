const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tagSchema = new mongoose.Schema({
    title: {
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

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
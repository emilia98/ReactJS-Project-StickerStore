const mongoose = require('mongoose');
const encryption = require('../utils/encryption.js');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    salt: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdOn: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    },
    isActive: {
        type: mongoose.SchemaTypes.Boolean,
        default: true
    },
    roles: [{
        type: mongoose.Schema.Types.String,
        default: ["User"]
    }]
});

userSchema.method({
    authenticate: function (password) {
        const currentHashedPassword = encryption.generateHashedPassword(password, this.salt);
        return this.hashedPassword === currentHashedPassword;
    }
});

const User = mongoose.model('User', userSchema);

User.seedAdminUser = async () => {
    let users = null;

    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }

    if (users.length > 0) {
        return;
    }

    let salt = encryption.generateSalt();
    let hashedPassword = encryption.generateHashedPassword('admin', salt);

    try {
        let user = await User.create({
            username: 'admin',
            email: 'admin@abv.bg',
            salt,
            hashedPassword,
            roles: ['Admin', 'User']
        });
    } catch (err) {
        return console.log(err);
    }
};

module.exports = User;
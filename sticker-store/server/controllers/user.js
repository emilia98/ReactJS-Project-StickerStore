const User = require('../models/User');

module.exports = {
    getAll: async (req, res) => {
        try {
            let users = await User.find();

            res.json({ data: users, msg: 'Here all the users you have requested!'});
        } catch(err) {
            console.log(err);
            return res.json({msg: 'An error occurred while trying to get all the users!', hasError: true})
        }
    },
    changeActiveStatus: async(req, res) => {
        let { id } = req.params;
        let user = null;

        if(!id) {
            return res.json({ msg: 'Please, provide an id!', hasError: true});
        }

        try {
            user = await User.findById(id);
        } catch(err) {
            console.log(err);
            return res.json({ msg: 'An error occurred while trying to get a user!', hasError: true});
        }

        if(!user) {
            return res.json({ msg: 'This user does not exist!', hasError: true});
        }

        let isActive = user.isActive;

        user.isActive = !isActive;

        try {
            let result = await user.save();
            res.status(200).json( { msg: 'Successfully change status of the user!'});
        } catch(err) {
            console.log(err);
            res.status(500).json( { msg: 'An error occurred while trying to change the status of a user!', hasError: true});
        }
    }
}
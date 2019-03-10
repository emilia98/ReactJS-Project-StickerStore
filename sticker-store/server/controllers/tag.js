const Tag = require('../models/Tag');

module.exports = {
    create: async (req, res) => {
        let { title } = req.body;
        let validated = validateTag(title, res);

        if(validated) {
            try {
                let result = await Tag.create({ title });
                console.log(result);

                res.status(200).json( { msg: 'Successfully added a new tag!'});
            } catch(err) {
                console.log(err);
                res.status(500).json( { msg: 'An error occurred while trying to create a new tag!', hasError: true});
            }
        }
    }
}

function validateTag(title, res) {
    
    let errors = [];

    if(title === undefined) {
        errors.push('Please, provide a title!');
    } else if(title.length === 0) {
        errors.push('Title is required!');
    } else if(/^([^\s]+)$/g.test(title) === false) {
        errors.push('Title should not contain any spaces!');
    } else if(title.length >= 50) {
        errors.push('Title should be at most 50 characters long!');
    }

    if(errors.length > 0) {
        res.json({ errors});
        return false;
    }

    return true;
}
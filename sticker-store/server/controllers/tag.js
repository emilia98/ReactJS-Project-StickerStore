const Tag = require('../models/Tag');

module.exports = {
    create: async (req, res) => {
        let { title } = req.body;
        let validated = validateTag(title, res);

        if(validated) {
            try {
                let result = await Tag.create({ title });

                res.status(200).json( { msg: 'Successfully added a new tag!'});
            } catch(err) {
                console.log(err);
                res.status(500).json( { msg: 'An error occurred while trying to create a new tag!', hasError: true});
            }
        }
    },
    getAll: async (req, res) => {
        try {
            let tags = await Tag.find();
            res.status(200).json( { data: tags, msg: 'Successfully get all the tags!'});
        } catch(err) {
            console.log(err);
            res.status(500).json( { msg: 'An error occurred while trying to get all the tags!', hasError: true});
        }
    },
    editGet: async (req, res) => {
        let { id } = req.params;
        let tag = null;

        if(!id) {
            return res.json({ msg: 'Please, provide an id!', hasError: true});
        }

        try {
            tag = await Tag.findById(id);
        } catch(err) {
            console.log(err);
            return res.json({ msg: 'An error occurred while trying to get a tag!', hasError: true});
        }

        if(!tag) {
            return res.json({ msg: 'This tag does not exist!', hasError: true});
        }

        res.json({
            msg: 'Here is the tag you have requested!',
            tag
        });
    },
    editPost: async (req, res) => {
        let { id } = req.params;
        let { title } = req.body;
        let tag = null;
        let validated = validateTag(title, res);

        if(!id) {
            return res.json({ msg: 'Please, provide an id!', hasError: true});
        }

        try {
            tag = await Tag.findById(id);
        } catch(err) {
            console.log(err);
            return res.json({ msg: 'An error occurred while trying to get a tag!', hasError: true});
        }

        if(!tag) {
            return res.json({ msg: 'This tag does not exist!', hasError: true});
        }
        
        if(validated) {
            tag.title = title;
            try {
                let result = await tag.save();
                res.status(200).json( { msg: 'Successfully edited the tag!'});
            } catch(err) {
                console.log(err);
                res.status(500).json( { msg: 'An error occurred while trying to save the edited tag!', hasError: true});
            }
        }
    },
    changeActiveStatus: async(req, res) => {
        let { id } = req.params;
        let tag = null;

        if(!id) {
            return res.json({ msg: 'Please, provide an id!', hasError: true});
        }

        try {
            tag = await Tag.findById(id);
        } catch(err) {
            console.log(err);
            return res.json({ msg: 'An error occurred while trying to get a tag!', hasError: true});
        }

        if(!tag) {
            return res.json({ msg: 'This tag does not exist!', hasError: true});
        }

        let isActive = tag.isActive;

        tag.isActive = !isActive;

        try {
            let result = await tag.save();

            console.log(result);
            res.status(200).json( { msg: 'Successfully change status of the tag!'});
        } catch(err) {
            console.log(err);
            res.status(500).json( { msg: 'An error occurred while trying to change the status of a tag!', hasError: true});
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
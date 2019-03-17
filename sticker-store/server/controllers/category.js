const Category = require('../models/Category');

module.exports = {
    create: async (req, res) => {
        let { title, slug } = req.body;
        if(!validate(title, slug, res)) {
            return;
        }

        try {
            let category = await Category.create({title, slug});
            res.json({msg: 'Successfully created a new category!'})
            
        } catch(err) {
            console.log(err);
            res.json({msg: 'An error occurred while trying to create a new category', hasError: true})
        }
    },
    getAll: async (req, res) => {
        try {
            let categories = await Category.find();
            res.json({msg: 'Successfully listed all the categories!', data: categories});
        } catch(err) {
            console.log(err);
            res.json({msg: 'An error occurred while trying to get all the categories', hasError: true});
        }
    },
    editGet: async (req, res) => {
        let { id } = req.params;
        let category = null;

        if(!id) {
            return res.json({ msg: 'Please, provide an id!', hasError: true});
        }

        try {
            category = await Category.findById(id);
        } catch(err) {
            console.log(err);
            return res.json({ msg: 'An error occurred while trying to get a category!', hasError: true});
        }

        if(!category) {
            return res.json({ msg: 'This category does not exist!', hasError: true});
        }

        res.json({
            msg: 'Here is the category you have requested!',
            category
        });
    },
    changeActiveStatus: async(req, res) => {
        let { id } = req.params;
        let category = null;

        if(!id) {
            return res.json({ msg: 'Please, provide an id!', hasError: true});
        }

        try {
            category = await Category.findById(id);
        } catch(err) {
            console.log(err);
            return res.json({ msg: 'An error occurred while trying to get a category!', hasError: true});
        }

        if(!category) {
            return res.json({ msg: 'This category does not exist!', hasError: true});
        }

        let isActive = category.isActive;

        category.isActive = !isActive;

        try {
            let result = await category.save();
            res.status(200).json( { msg: 'Successfully change status of the category!'});
        } catch(err) {
            console.log(err);
            res.status(500).json( { msg: 'An error occurred while trying to change the status of a category!', hasError: true});
        }
    }
}


function validate(title, slug, res){
    let errors = [];

    if(title === undefined) {
        errors.push('Please, provide a title!');
    }

    if(slug === undefined) {
        errors.push('Please, provide a slug!');
    }

    if(errors.length > 0) {
     res.json({ errors });
     return false;
    }

    if(title.length === 0) {
        errors.push('Title is required!')
    } else if(title.length > 45) {
        errors.push('Title should be at most 45 characters!')
    } else if(!validateTitle(title)) {
        errors.push('Title should contain only English letters, digits, `,`, `,` and spaces');
    }

    if(slug.length === 0) {
        errors.push('Slug is requried!')
    } else if(slug.length > 60) {
        errors.push('Slug should be at most 60 characters!')
    } else if(!validateSlug(slug)) {
        errors.push('Slug should contain only English letters, digits and `-`');
    }

    if(errors.length > 0) {
        res.json({ errors });
        return false;
    }
    return true;
}

function validateTitle(title) {
    return /^([A-Za-z0-9,.\s]+)$/.test(title);
}

function validateSlug(slug) {
    return /^([A-Za-z0-9-]+)$/.test(slug);
}
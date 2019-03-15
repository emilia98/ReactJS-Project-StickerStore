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
    listAll: async (req, res) => {
        try {
            let categories = await Category.find();
            console.log(categories);
            
            res.json({msg: 'Successfully listed all the categories!', data: categories});
        } catch(err) {
            console.log(err);
            res.json({msg: 'An error occurred while trying to get all the categories', hasError: true});
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
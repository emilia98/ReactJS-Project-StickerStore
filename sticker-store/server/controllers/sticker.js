const cloudinary = require('cloudinary');
const Sticker = require('../models/Sticker');
const Category = require('../models/Category');

module.exports = {
    create: async (req, res) => {
        let files = req.files;
        let errors = [];
        let found = [];

        if(checkIfMissing(req, errors)) {
            return res.json({errors});
        }

        let { title, price, description, qty, categories, tags} = req.body;
        let category = { title, price};

        validateTitle(title, errors);
        validatePrice(price, errors);

        if(description !== undefined) {
            category.description = description;
        }

        if(qty !== undefined) {
            validateQty(qty, errors);
            category.qty = qty;
        }

        if(categories !== undefined && categories.length > 0) {
            let invalids = 0;
            for(let c of categories) {
                try {
                    let cat = await Category.findById(c);

                    if(!cat) invalids++;
                    else {
                        found.push(cat._id);
                    }
                    
                    
                } catch(err) {
                    console.log(err);
                    invalids++;
                }
            }

            if(invalids.length > 0) {
                errors.push(`An error occurred while trying to add invalid ${invalids} category(ies)!`);
            } else {
                category.categories = found;
            }
        }
        
        if(errors.length > 0) {
            return res.json({errors});
        }

        let finalImages = [];
        

        let promises = files.map(image => new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(
                image.path,
                {
                  public_id: `stickers/${title}/${image.filename.replace(/(.png)|(.jpeg)|(.jpg)/g, "")}`
                },
                function (error, result) {
                    if(error) {
                        reject(err);
                    } else {
                        finalImages.push(result.url);
                        resolve(result)
                    }
                }
              );
        })
        )

        Promise.all(promises)
        .then(async (data) => {
            category.images = finalImages;

            try {
                let newSticker = await Sticker.create(category);
                console.log(newSticker);
                return res.json({msg: 'Successfully created a new sticker!'})
            } catch(err){
                console.log(err);
                return res.json({msg: 'An error occurred while trying to create a new sticker!'});
            }
        })
        .catch(err => {
            console.log(err);
            return res.json({msg: 'An error occurred while trying to save images to the cloud!'});
        })
       

      
    }
}

function checkIfMissing(req, errors) {
    let { title, price} = req.body;

    if(title === undefined) errors.push('Title is required!');
    if(price === undefined) errors.push('Price is required!');

    return errors.length > 0;
    
}

function validateTitle(title, errors) {
    if(title.length < 2 || title.length > 60) {
        errors.push('Title should be between 2 and 60 characters long');
        return true;
    }

    return false;
}

function validatePrice(price, errors) {
    let toNum = price * 1.0;

    
    if(isNaN(toNum) || toNum < 0) {
        errors.push('Price should be a positive number');
        return true;
    }

    return false;
}

function validateQty(qty, errors) {
    let toNum = qty * 1.0;
    if(!Number.isInteger(toNum) || toNum < 0) {
        errors.push('Quantity should be an positive int number');
        return true;
    }

    return false;
}
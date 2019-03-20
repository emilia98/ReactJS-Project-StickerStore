const cloudinary = require('cloudinary');
const Sticker = require('../models/Sticker');
const Category = require('../models/Category');
const Tag = require('../models/Tag');

module.exports = {
    getAll: async(req, res) => {

       await getAllEntries(res, {});
    },
    getActive: async(req, res) => {
        await getAllEntries(res, {isActive: true});
    },
    create: async (req, res) => {
        let files = req.files;
        let mainImg = files.filter(i => i.fieldname === 'mainImg');
        let images = files.filter(i =>  i.fieldname === 'images');

        let errors = [];
        let found = [];
        let foundTags = [];

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

        

        if(tags !== undefined && tags.length > 0) {
            tags = tags.split(/\s|,/g).filter(el => el !== '');

            for(let tag of tags) {
                try {
                    let t = await Tag.findOne({title: tag});

                    if(t === null) {
                        t = await Tag.create({ title: tag});
                    } 

                    foundTags.push(t);
                } catch(err) {
                    console.log(err);
                }
            }

            category.tags = foundTags.map(t => t._id);
            console.log(category.tags);
           
        }

        // console.log(category.tags);

        // return;
        

        if(categories !== undefined && categories.length > 0) {
            let invalids = 0;
            for(let c of categories) {
                try {
                    let cat = await Category.findById(c);

                    if(!cat) {
                        invalids++;
                        break;
                    }
                    else {
                        found.push(cat._id);
                    }
                } catch(err) {
                    console.log(err);
                    invalids++;
                }
            }

            /*if(invalids > 0) {
                errors.push({ categories: `An error occurred while trying to add invalid ${invalids} category(ies)!`});
            } else {
                category.categories = found;
            }*/
            category.categories = found;
        }
        
        if(errors.length > 0) {
            return res.json({errors});
        }

        let promises = [];
        let finalImages = [];
        let mainImage = [];
        if(images && images.length > 0) {
           
        

            promises = images.map(image => new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(
                    image.path,
                    {
                      public_id: `stickers/${image.filename.replace(/(.png)|(.jpeg)|(.jpg)/g, "")}`
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


        }
        

        if(mainImg && mainImg.length > 0) {
            mainImg = mainImg[0];

            promises.push(new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(
                    mainImg.path,
                    {
                      public_id: `stickers/${mainImg.filename.replace(/(.png)|(.jpeg)|(.jpg)/g, "")}`
                    },
                    function (error, result) {
                        if(error) {
                            reject(err);
                        } else {
                            mainImage = result.url;
                            category.mainImg = mainImage;
                            resolve(result);
                        }
                    }
                  );
            }))
        }

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
       

      
    },
    changeActiveStatus: async(req, res) => {
        let { id } = req.params;
        let sticker = null;

        if(!id) {
            return res.json({ msg: 'Please, provide an id!', hasError: true});
        }

        try {
            sticker = await Sticker.findById(id);
        } catch(err) {
            console.log(err);
            return res.json({ msg: 'An error occurred while trying to get a sticker!', hasError: true});
        }

        if(!sticker) {
            return res.json({ msg: 'This sticker does not exist!', hasError: true});
        }

        let isActive = sticker.isActive;

        sticker.isActive = !isActive;

        try {
            let result = await sticker.save();
            res.status(200).json( { msg: 'Successfully change status of the sticker!'});
        } catch(err) {
            console.log(err);
            res.status(500).json( { msg: 'An error occurred while trying to change the status of a sticker!', hasError: true});
        }
    }
}


async function getAllEntries(res, obj) {
    try {
        let stickers = await Sticker.find(obj);

        res.json({data: stickers, msg: 'Successfully received all the stickers'});
    } catch(err) {
        console.log(err);
        res.json({msg: 'An error occurred while trying to get all the stickers!', hasError: true})
    }
}

function checkIfMissing(req, errors) {
    let { title, price} = req.body;

    // 
    if(title === undefined) errors.push('Please, provide a title!');
    if(price === undefined) errors.push('Please, provide a price!');

    return errors.length > 0;
    
}

function validateTitle(title, errors) {
    if(title.length === 0) {
        errors.push('Title is required!');
        return true;
    } else if(title.length < 2 || title.length > 60) {
        errors.push('Title should be between 2 and 60 characters long');
        return true;
    }

    return false;
}

function validatePrice(price, errors) {
    let toNum = price * 1.0;

    if(price.length === 0) {
        errors.push('Price is required!');
        return true;
    } else if(isNaN(toNum) || toNum < 0) {
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
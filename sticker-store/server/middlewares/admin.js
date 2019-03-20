const User = require('../models/User');

module.exports = async (req, res, next) => {
   let user = null;

   try {
       user = await User.findById(req.decoded.userId);
       
   } catch(err) {
       console.log(err);
       return res.status(401).json({
        success: false,
        isAdmin: false,
        message: 'An error occurred while checking your role!'
      });
   }

   if(!user) {
    return res.status(401).json({
        success: false,
        isAdmin: false,
        message: 'This user does not exist!'
      });
   }

   if(user.roles.indexOf('Admin') === -1) {
    return res.status(401).json({
        success: false,
        isAdmin: false,
        message: 'You are not an admin!'
      });
   }

   next();
}
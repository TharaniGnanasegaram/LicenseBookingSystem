const User = require('../models/User');

module.exports = async(req, res) =>{
    
     await User.findByIdAndUpdate(req.session.userId, {$set:req.body})
    res.redirect('/G2');
}
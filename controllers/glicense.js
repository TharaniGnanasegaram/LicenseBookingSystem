const User = require('../models/User');

module.exports = async(req, res) =>{
    const userRetrieved = await User.findById(req.session.userId)
   
    res.render('G License', { userRetrieved })
}
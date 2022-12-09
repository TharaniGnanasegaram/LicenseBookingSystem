const User = require('../models/User');

module.exports = async(req, res) =>{
    const userRetrieved = await User.findByIdAndUpdate(req.params.id, {cardetails : req.body.cardetails})
    res.redirect('/G')
}
const User = require('../models/User');

module.exports = (req, res) =>{

    res.render('Signup', {
        errors : req.flash('validationErrors')
    });
}
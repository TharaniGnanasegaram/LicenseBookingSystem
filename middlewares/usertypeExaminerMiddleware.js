const User = require('../models/User');

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) =>{
        if( req.session.usertype != "Examiner"){
            return res.redirect('/')
        }
        next();
    })
}
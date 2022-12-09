const User = require('../models/User')

module.exports = async(req, res) =>{

        let myResultRetrieved = await User.findById(req.session.userId).populate('appointmentId');

        res.render('MyResults', {myResultRetrieved});

}
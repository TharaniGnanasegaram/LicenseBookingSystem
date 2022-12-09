const User = require('../models/User')

module.exports = async(req, res) =>{


        let driverTestsRetrieved = await User.find({appointmentId : { $ne: null }}).populate('appointmentId').sort({"firstname":1});

        res.render('Results', {driverTestsRetrieved});

}
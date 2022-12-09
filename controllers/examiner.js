const User = require('../models/User')

module.exports = async(req, res) =>{

    if(req.params.testtype != null){

        let driverTestsRetrieved = await User.find({appointmentId : { $ne: null }, testtype : req.params.testtype}).populate('appointmentId').sort({"firstname":1});

        res.render('Examiner', {driverTestsRetrieved});
    }

    else{

        let driverTestsRetrieved = await User.find({appointmentId : { $ne: null }}).populate('appointmentId').sort({"firstname":1});

        res.render('Examiner', {driverTestsRetrieved});
    }

    
}
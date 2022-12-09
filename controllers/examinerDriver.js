const User = require('../models/User')

module.exports = async(req, res) =>{

    const driverRetrieved = await User.findById(req.params.id).populate('appointmentId');

    res.render('ExaminerDriver', { driverRetrieved })

    
}
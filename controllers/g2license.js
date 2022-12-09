const User = require('../models/User');
const Appointment = require('../models/Appointment');

module.exports = async(req, res) =>{
    
    let AppointmentRetrieved = null;
    let appointDate = null;

    let userRetrieved = await User.findById(req.session.userId).populate('appointmentId');
    console.log(userRetrieved);
    
    // else{
        res.render('G2 License', { userRetrieved, AppointmentRetrieved, appointDate })
    // }
    
}
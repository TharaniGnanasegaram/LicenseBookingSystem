
const Appointment = require('../models/Appointment');
const User = require('../models/User')

module.exports = async(req, res) =>{
  
    let userRetrieved = await User.findById(req.session.userId);

    const AppointmentRetrieved = await Appointment.find({
        appointmentdate : req.params.date, isTimeSlotAvailable : true
    })
    const appointDate = req.params.date;
    
    res.render('G License', { userRetrieved, AppointmentRetrieved, appointDate })
}
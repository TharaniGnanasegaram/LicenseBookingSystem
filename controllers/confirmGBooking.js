const User = require('../models/User');
const Appointment = require('../models/Appointment');

module.exports = async(req, res) =>{

    const AppointmentRetrieved = await Appointment.find({
        appointmentdate : req.params.date,
        appointmenttime :req.body.appointmenttime
    })
    console.log(req.body)
    await User.findByIdAndUpdate(req.session.userId,  { appointmentId : AppointmentRetrieved[0]._id, testtype : req.body.testtype} )
    await Appointment.findByIdAndUpdate(AppointmentRetrieved[0]._id,  { isTimeSlotAvailable : false} )
     
    res.redirect('/G');
}
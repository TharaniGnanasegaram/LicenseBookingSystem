
const Appointment = require('../models/Appointment');

module.exports = async(req, res) =>{
  
    const AppointmentRetrieved = await Appointment.find({
        appointmentdate : req.params.date
    })
    const appointDate = req.params.date;
    
    res.render('Appointment', { AppointmentRetrieved, appointDate })
}
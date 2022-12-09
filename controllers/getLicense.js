const User = require('../models/User');
const Appointment = require('../models/Appointment');

module.exports = async(req, res) =>{

    let AppointmentRetrieved = null;
    let appointDate = null;

    const userRetrieved = await User.findById(req.session.userId).populate('appointmentId');

    res.render('G License', { userRetrieved, AppointmentRetrieved, appointDate })
}
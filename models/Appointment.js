const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AppointmentSchema = new Schema({

    appointmentdate: { 
        type: String, 
        required : [true, 'Please select a date']
    },

    appointmenttime: { 
        type: String, 
        required : [true, 'Please select a time']
    },
    isTimeSlotAvailable: {
        type: Boolean,
        default : true
    }
});


const Appointment = mongoose.model('appointment', AppointmentSchema);

module.exports = Appointment
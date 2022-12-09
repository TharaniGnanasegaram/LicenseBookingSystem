const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt');


const CarSchema = new Schema({
    make: { 
        type: String, 
        required: true,
        default: 'make'
    },
    model : { 
        type: String, 
        required: true,
        default: 'model'
    },
    vehicleyear : { 
        type: Number, 
        required: true,
        default: 0
    },
    platenumber : { 
        type: String, 
        required: true,
        default: '0000'
    }

});

const UserSchema = new Schema({

    username: { 
        type: String, 
        required : [true, 'Please provide a username'],
        unique:  [true, 'Username already exists. Please provide a new username']
    },

    password: { 
        type: String, 
        required : [true, 'Please provide a password']
    },

    firstname: { 
        type: String, 
        required: true,
        default: 'firstname'
    },
    lastname : { 
        type: String, 
        required: true,
        default: 'lastname'
    },
    age : { 
        type: Number, 
        required: true,
        default: 0
    },
    licenseno : { 
        type: String, 
        required: true,
        default: 'licenseno'
    },
    dob : { 
        type: Date, 
        required: true,
        default: new Date()
    },
    usertype : {
        type: String,
        required: true

    },

    appointmentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'appointment'
    },

    testtype : {
        type: String

    },
    
    comments : {
        type : String
    },

    result : {
        type : Boolean
    },

    cardetails: { type: CarSchema, default: () => ({}) },

});

UserSchema.plugin(uniqueValidator);

// encrypt password
UserSchema.pre('save', function(next){
    const user = this;

    bcrypt.hash(user.password, 9 , (error, hashpassword) => {
        user.password = hashpassword
        next()
    })
})

// encrypt license while saving
// UserSchema.pre('save', function(next){
//     const user = this;
//     bcrypt.hash(user.licenseno, 9 , (error, hashlicense) => {
//         user.licenseno = hashlicense
//         next()
//     })

// })


// encrypt license while updating. (while changing default license into actual license number)
UserSchema.pre('findOneAndUpdate', function(next){
    
    const user = this._update.$set;
    
    if(user === undefined){
        next()
    }
    else{
        bcrypt.hash(user.licenseno, 9 , (error, hashlicense) => {
            user.licenseno = hashlicense
            next()
        })
    }
    
})

const User = mongoose.model('user', UserSchema);

module.exports = User
const express = require('express')
const { dirname } = require('path')
const path = require('path')
const ejs = require('ejs');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const flash = require('connect-flash')

const dashboardController = require('./controllers/dashboard');
const gController = require('./controllers/glicense');
const g2Controller = require('./controllers/g2license');
const loginController = require('./controllers/login');
const signupController = require('./controllers/signup');
const storeDetailsController = require('./controllers/storeDetails');
const getLicenseController = require('./controllers/getLicense');
const updateLicenseController = require('./controllers/updateDetails');
const userregisterController = require('./controllers/userregister');
const userloginController = require('./controllers/userlogin');
const logOutController = require('./controllers/logout')
const appointmentController = require('./controllers/appointment')
const resultController = require('./controllers/result')
const createAppointmentController = require('./controllers/createAppointment');
const getAppointmentController = require('./controllers/getAppointmentTime');
const getBookTestTimeController = require('./controllers/g2BookTimeSlot');
const g2bookTestController = require('./controllers/confirmG2Booking');
const getGBookTestTimeController = require('./controllers/gBookTimeSlot');
const gbookTestController = require('./controllers/confirmGBooking');
const examinerController = require('./controllers/examiner');
const examinerDriverController = require('./controllers/examinerDriver');
const examinerResultController =  require('./controllers/examinerResult');
const myResultController = require('./controllers/myResult');


const authnMiddleware = require('./middlewares/authMiddleware')
const usertypeDriverMiddleware = require('./middlewares/usertypeDriverMiddleware')
const usertypeAdminMiddleware = require('./middlewares/usertypeAdminMiddleware')
const usertypeExaminerMiddleware = require('./middlewares/usertypeExaminerMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middlewares/redirectIfAuthenticatedMiddleware')

const app = express()

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(flash());
// app.use(express.json())
// app.use(express.urlencoded());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(expressSession({
    secret: 'conestoga'
}))

global.LoggedIn = null;
global.UserType = null;

app.use("*", (req, res, next) => {
    LoggedIn = req.session.userId;
    UserType = req.session.usertype;
    next();
})

mongoose.connect(
    'mongodb+srv://tharumanoj:admintharu@cluster0.c9nteks.mongodb.net/driveTest?retryWrites=true&w=majority',
    { useNewUrlParser: true }, (error) => {
        console.log(error, "Connected");
    })


app.listen(3000, () => {
    console.log("listening on port 3000")
})

app.get('/', dashboardController);

app.get('/G',authnMiddleware, usertypeDriverMiddleware, getLicenseController);

app.get('/G2', authnMiddleware, usertypeDriverMiddleware, g2Controller);

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);

app.get('/auth/signup', redirectIfAuthenticatedMiddleware, signupController);

app.post('/post/storeG2', authnMiddleware, storeDetailsController);

app.post('/updatelicensedetail/:id', authnMiddleware, updateLicenseController);

app.post('/user/register', redirectIfAuthenticatedMiddleware, userregisterController);

app.post('/user/login', redirectIfAuthenticatedMiddleware, userloginController);

app.get('/auth/logout', logOutController);

app.get('/appointment', authnMiddleware, usertypeAdminMiddleware, appointmentController);

app.get('/results', authnMiddleware, usertypeAdminMiddleware, resultController);

app.post('/post/appointment/:date', authnMiddleware, createAppointmentController);

app.get('/appointment/time/:date', authnMiddleware, getAppointmentController);

app.get('/g2/booktime/:date', authnMiddleware, usertypeDriverMiddleware, getBookTestTimeController);

app.get('/g/booktime/:date', authnMiddleware, usertypeDriverMiddleware, getGBookTestTimeController);

app.post('/g2/bookAppointment/:date', authnMiddleware, usertypeDriverMiddleware, g2bookTestController);

app.post('/g/bookAppointment/:date', authnMiddleware, usertypeDriverMiddleware, gbookTestController);

app.get('/myResult', authnMiddleware, usertypeDriverMiddleware, myResultController);

app.get('/examiner', authnMiddleware, usertypeExaminerMiddleware, examinerController);

app.get('/examiner/:testtype', authnMiddleware, usertypeExaminerMiddleware, examinerController);

app.get('/examiner/driverDetails/:id', authnMiddleware, usertypeExaminerMiddleware, examinerDriverController);

app.post('/examiner/submitResult/:id', authnMiddleware, usertypeExaminerMiddleware, examinerResultController);

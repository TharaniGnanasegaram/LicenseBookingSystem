const User = require('../models/User')

module.exports = async(req, res) =>{

    let resultVal = false;
    if(req.body.result == "on"){
        resultVal = true;
    }

    const driverRetrieved = await User.findByIdAndUpdate(req.params.id, {comments : req.body.comments, result : resultVal});
    res.redirect('/examiner/driverDetails/'+req.params.id)

    // res.render('ExaminerDriver', { driverRetrieved })

    
}
const Report = require("../models/Report");
const {handleReportError} = require("../handlers/errorHandler")


const report_create = async(req,res)=>{
    const {BODY} = req.body
    try {
        await Report.publish(BODY);
        res.status(200).json({success:true, message: "Succesfully published the report for the view!!"})
    } catch (err) {
        console.log(err);
        const errors = handleReportError(err);
        res.status(400).json({errors, success:false, message: "Couldn't create the report because of errors!!"})
    }
}


module.exports = {report_create}
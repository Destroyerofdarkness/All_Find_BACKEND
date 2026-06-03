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


const send_all_reports = async(req,res)=>{
    try {
        const reports = await Report.find();
        res.status(200).json({reports, success:true, message:"Succesfully got all the reports from the database"});
    } catch (err) {
        console.log(err);
        res.status(500).json({err, success:false, message: "Couldn't get all the reports because of Internal Server Error!!"})
    }
}

module.exports = {
    report_create,
    send_all_reports
}
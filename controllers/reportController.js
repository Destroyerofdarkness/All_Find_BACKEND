const Report = require("../models/Report");
const {handlerReportError} = require("../handlers/errorHandler")


const report_create = async(req,res)=>{
    const {BODY} = req.body
    try {
        await Report.publish(BODY);
        res.status(200).json({success:true, message: "Succesfully published the report for the view!!"})
    } catch (err) {
        console.log(err);
        res.status(400).json({err, success:false, message: "Couldn't create the report because of errors!!"})
    }
}


module.exports = {report_create}
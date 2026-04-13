const Report = require("../models/reports.js");
const {handle_report_errors}= require("../handlers/modelErrorHandler.js")

const report_publish = async (req,res) => {
  const { BODY } = req.body;
  try {
    await Report.publish(BODY);
    res.status(201).json({success:true, message: "Succesfully published the Report!!"})
  } catch (err) {
    console.log(err);
    const errors = handle_report_errors(err);
    res
      .status(400)
      .json({
        errors,
        success: false,
        message: "Unable to publish the report because of errors!!",
      });
  }
};

const all_reports = async(req,res)=>{
    try {
        const reports = Report.find();
        res.status(200).json({reports, success:true, message:"Succesfully got all the reports from the database!"});
    } catch (err) {
        console.log(err);
        res.status(500).json({err,success:false, message: "Unable to get all the reports cause of Internal Server Error!!"})
    }
}

module.exports = {report_publish,all_reports}
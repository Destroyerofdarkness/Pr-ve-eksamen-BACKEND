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

module.exports = {report_publish}
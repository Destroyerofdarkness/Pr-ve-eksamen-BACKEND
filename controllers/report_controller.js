const Report = require("../models/reports.js");

const report_publish = async (req,res) => {
  const { BODY } = req.body;
  try {
    await Report.publish(BODY);
    res.status(201).json({success:true, message: "Succesfully published the Report!!"})
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        err,
        success: false,
        message: "Unable to publish the report because of errors!!",
      });
  }
};

module.exports = {report_publish}
const IncomingForm = require("formidable").IncomingForm;

module.exports = function upload(req, res) {
  var form = new IncomingForm();

  form.on("file", (field, file) => {
    console.log("field : ", file);
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};

const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  res.json({
    message: "hello world"
  });
});

router.post("/form", async (req, res) => {
  console.log("data :", req.body.data[0].field);
  const user = await User.findOne({
    EmailAddress: req.body.EmailAddress
  });
  if (user == null) {
    await new User({
      Name: req.body.data[0].field,
      PermanentAddress: req.body.data[1].field,
      EmailAddress: req.body.data[2].field,
      MailingAddress: req.body.data[3].field,
      YourDateOfBirth: req.body.data[4].field
    }).save();
    await res.status(200).json({
      authenticated: true,
      message: "user successfully signup"
    });
  } else {
    await res.status(200).json({
      authenticated: false,
      message: "Account already exists "
    });
  }
});

module.exports = router;

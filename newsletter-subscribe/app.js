// Newsletter subscribe using Mailchimp API
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fullName = req.body.name;
  const [firstName, lastName] = fullName.split(" ");
  const email = req.body.mail;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "URL API enterpoint";
  const options = {
    method: "POST",
    auth: "origin:apiKey", // set your origin & apiKey
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    });
  });

  request.write(jsonData); // pass to jsonData to the server
  request.end();
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

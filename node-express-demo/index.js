const Joi = require("joi");
const express = require("express");
const app = express();

const courses = require("./routes/courses");

const home = require("./routes/home");

app.use(express.json()); // This is the way to add a middleware function (to handle requests)

app.use(express.urlencoded({ extended: true })); // key=value&key=value

app.use(express.static("public")); // with this we can go to http//:localhost:4000/readme.txt and the text inside this file will be presented

app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

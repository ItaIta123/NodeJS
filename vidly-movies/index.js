// RESTFUL API using express
// the backend CRUD server for VIDLY movies
// http://vidly.com/api/genres
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/genres", genres.router);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/vidly", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

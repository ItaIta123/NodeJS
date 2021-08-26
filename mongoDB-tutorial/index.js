// Connecting to MongoDB

/* In order to run successfully, run:
    1. brew services start mongodb-community@5.0
    2. nodemon index.js
    The first one is to connect or "turn on" the new connection way to mongo
*/

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/playground", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

// Creating a Schema for our course document
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  data: { type: Date, default: Date.now },
  isPublished: Boolean,
});

// Creating a model to be used in our collection of courses
const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  // Create a new course (document) using the above Course model
  const course = new Course({
    // name: "React Course",
    author: "Itamar",
    tags: ["React", "Frontend"],
    isPublished: true,
  });

  // Saving the new document
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
};

const getCourses = async () => {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)
  try {
    const courses = await Course
      // Filtering the results of the query:
      // .find({ author: "Itamar" , isPublished: true })
      // Filtering through operations logic:
      // .find({ price: { $gte: 10, $lte: 20 } })
      // Filtering through 'or' and 'and' logic:
      //   .find()
      //   .or([{ author: "Itamar" }, { isPublished: true }])
      // Filtering using ReGex expressions:
      // Starts with Ita
      //   .find({ author: /^Ita/ })
      // Ends with mar
      // .find({ author: /mar$/ })
      // Contains tama
      .find({ author: /.*mar.*/ })
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1 });
    //   .count();
    console.log(courses);
  } catch (e) {
    console.error("Error ", e);
  }
};

// Course.find();
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// getCourses();
createCourse();

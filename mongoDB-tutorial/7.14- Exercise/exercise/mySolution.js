/* Task:
    1.
   Get all the published backend course, 
   sort them by their name,
   pick only their name and author,
   and display them
*/

// require mongoose
const mongoose = require("mongoose");

// connect to mongoose (Mongo)
mongoose.connect("mongodb://localhost:27017/mongo-exercises", {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB!");
});

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

const getCoursesExercise1 = async () => {
  try {
    const courses = await Course.find({ isPublished: true, tags: "backend" })
      .sort({ name: 1 })
      .select({ name: 1, author: 1 });
    console.log("Exercise1:");
    console.log(courses);
  } catch (e) {
    console.error(e.message);
  }
};

// 2:
// Get all the published courses that are frontend or backend and sort them by their prices.

const getCoursesExercise2 = async () => {
  try {
    const courses = await Course.find({ isPublished: true })
      .or([{ tags: "backend" }, { tags: "frontend" }])
      .sort({ price: -1 })
      .select({ name: 1, author: 1, price: 1, tags: 1 });
    console.log("Exercise2:");
    console.log(courses);
  } catch (e) {
    console.error(e.message);
  }
};

// 3:
// Get all the published courses that are >= $15 OR their name contains "by"

const getCoursesExercise3 = async () => {
  try {
    const courses = await Course.find({
      isPublished: true,
    })
      .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
      .select({ name: 1, author: 1, price: 1, tags: 1 });
    console.log("Exercise3:");
    console.log(courses);
  } catch (e) {
    console.error(e.message);
  }
};

var ObjectId = require("mongodb").ObjectID;

const updateCourse = async (id) => {
  // Approach: Query first
  // .findByID()
  // Modify
  // .save()

  const course = await Course.findById(ObjectId(id));
  if (!course) {
    console.log("No id got matched");
    return;
  }

  course.isPublished = true;
  course.author = "A new Author";
  // OR
  //   course.set({
  //     isPublished: true,
  //     author: "A new Author",
  //   });
  const res = await course.save();
  console.log(res);

  // Approach: Update first
  // update directly
  // OptionallyL: get the updated document
};

// updateCourse("5a68fdf95db93f6477053ddd");

// getCoursesExercise1();
// getCoursesExercise2();
// getCoursesExercise3();

const express = require("express");

const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(["course 1", "course 2", "course 3"]);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = { id: courses.length + 1, name: req.body.name };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const courseToUpdate = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );

  if (!courseToUpdate) {
    res.status(404).send("No course with that ID was found");
    return;
  }

  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  courseToUpdate.name = req.body.name;
  res.send(courseToUpdate);
});

router.get("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (course) {
    res.send(`Welcome to course #${req.params.id} :)`);
    return;
  } else
    return res
      .status(404)
      .send(`The course with ID ${req.params.id} was not found :()`);
});

router.delete("/:id", (req, res) => {
  const course = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );

  if (!course) {
    res
      .status(404)
      .send(`The course with ID ${req.params.id} was not found :()`);
    return;
  }
  const index = courses.indexOf(course);

  courses.splice(index, 1);

  res.send(courses);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

module.exports = router;

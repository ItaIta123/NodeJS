const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

// Creating a Schema and Creating a model
const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: { type: String, required: true },
  })
);

// const genres = [
//   { id: 1, name: "Horror" },
//   { id: 2, name: "Action" },
//   { id: 3, name: "Comedy" },
// ];

// receiving all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// receiving one genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("No genre with that ID was found");

  res.send(genre);
});

// add a genre
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(400).send(result.error);

  let genre = new Genre({ name: req.body.name });

  genre = await genre.save();

  res.send(genre);
});

// modifying a genre

router.put("/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(400).send(result.error);

  const genreToModify = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!genreToModify) {
    return res.status(400).send("The Genre with the given ID was not found");
  }

  res.send(genreToModify);
});

// delete a genre

router.delete("/:id", async (req, res) => {
  const genreToDelete = await Genre.findByIdAndRemove(req.params.id);

  res.send(await Genre.find());
});

const validate = (course) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(course);
};

module.exports.router = router;

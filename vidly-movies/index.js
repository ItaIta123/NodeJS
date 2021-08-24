// the backend CRUD server for VIDLY movies
// http://vidly.com/api/genres

const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Comedy" },
];

// receiving all genres

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// add a genre
app.post("/api/genres/", (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(400).send(result.error);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);

  res.send(genres);
});

// modifying a genre

app.put("/api/genres/:id", (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(400).send(result.error);
  const genreToModify = genres.find(
    (genre) => genre.id === parseInt(req.params.id)
  );

  genreToModify.name = req.body.name;

  res.send(genres);
});

// delete a genre

app.delete("/api/genres/:id", (req, res) => {
  const genreToDelete = genres.find(
    (genre) => genre.id === parseInt(req.params.id)
  );

  const index = genres.indexOf(genreToDelete);

  genres.splice(index, 1);

  res.send(genres);
});

const validate = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

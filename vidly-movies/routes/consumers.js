const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

// Creating a Schema and Creating a model
const Costumer = mongoose.model(
  "Costumer",
  new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    isGold: { type: Boolean, default: false },
  })
);

// receiving all genres
router.get("/", async (req, res) => {
  const costumers = await Costumer.find().sort("name");
  res.send(costumers);
});

// receiving one genre
router.get("/:id", async (req, res) => {
  const costumer = await Costumer.findById(req.params.id);

  if (!costumer) return res.status(404).send("No genre with that ID was found");

  res.send(costumer);
});

// add a genre
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(400).send(result.error);

  let costumer = new Costumer({ name: req.body.name });

  costumer = await costumer.save();

  res.send(costumer);
});

// modifying a genre
router.put("/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.status(400).send(result.error);

  const costumerToModify = await Costumer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!costumerToModify) {
    return res.status(400).send("The Genre with the given ID was not found");
  }

  res.send(costumerToModify);
});

// delete a genre

router.delete("/:id", async (req, res) => {
  const costumerToDelete = await Costumer.findByIdAndRemove(req.params.id);

  res.send(await Costumer.find());
});

const validate = (costumer) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(costumer);
};

module.exports.router = router;

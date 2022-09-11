const { body } = require("express-validator");

function createProjectValidator() {
  return [
    body("title").notEmpty()
      .withMessage("Title Project Cannot Be Empty"),
    body("text").notEmpty().
      isLength({ min: 20 }).
      withMessage("Description Project Cannot Be Empty"),
    body("tags").isArray({ min: 0, max: 10 }).withMessage("Maximum 10")
  ]
}

module.exports = {
  createProjectValidator
}
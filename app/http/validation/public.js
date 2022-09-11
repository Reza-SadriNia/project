const { param } = require("express-validator");

function mongoIdValidator() {
  return [
    param("id").isMongoId().withMessage("Invalid ID")
  ]
}

module.exports = {
  mongoIdValidator
}
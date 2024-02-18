const authenticate = require("./authenticate");
const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const upload = require("./upload");

module.exports = {
  isValidId,
  authenticate,
  validateBody,
  upload,
};

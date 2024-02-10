const { Types } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const validId = Types.ObjectId.isValid(contactId);

  if (!validId) {
    return res.status(404).json({ message: "Not found" });
  }

  next();
};

module.exports = isValidId;

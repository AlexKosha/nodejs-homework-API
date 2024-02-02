const { Types } = require("mongoose");

const verificationId = (id) => Types.ObjectId.isValid(id);

module.exports = verificationId;

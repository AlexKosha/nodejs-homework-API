const validateBody = (schema) => async (req, res, next) => {
  const { body } = req;

  try {
    await schema.validateAsync(body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({ message: errorMessages[0] });
  }
};

module.exports = validateBody;

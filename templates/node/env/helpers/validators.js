const { validationResult } = require('express-validator');

const validateSchema = schemas => {
  return async (req, res, next) => {
    await Promise.all(schemas.map(schema => schema.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const errors = result.array();
    return res.status(400).send(errors);
  };
};

module.exports = {
  validateSchema,
};

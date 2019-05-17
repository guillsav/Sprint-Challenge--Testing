const Joi = require('@hapi/joi');

module.exports = function validation(req, res, next) {
  const schema = Joi.object().keys({
    title: Joi.string()
      .alphanum()
      .min(3)
      .max(128)
      .required(),
    genre: Joi.string()
      .alphanum()
      .min(3)
      .max(128)
      .required(),
    genre: Joi.string()
      .alphanum()
      .min(6)
      .max(128)
      .required(),
    releaseYear: Joi.number().integer()
  });

  Joi.validate(req.body, schema, (e, result) => {
    if (e) {
      res
        .status(422)
        .json({message: 'Please provide title, genre and release year.'});
    } else {
      next();
    }
  });
};

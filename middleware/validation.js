const Joi = require('@hapi/joi');

module.exports = function validation(req, res, next) {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(3)
      .max(128)
      .required(),

    genre: Joi.string().required(),
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

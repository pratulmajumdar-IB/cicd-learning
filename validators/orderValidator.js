const Joi = require("joi");

const createOrderSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  items: Joi.array()
    .items(
      Joi.object({
        product_id: Joi.number().integer().positive().required(),

        quantity: Joi.number().integer().positive().required(),
      }),
    )
    .min(1)
    .required(),
});

module.exports = {
  createOrderSchema,
};

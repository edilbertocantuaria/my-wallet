import joi from 'joi';

export const transactionSchema = joi.object({
    value: joi.number().precision(2).min(0).required(),
    description: joi.string().required().trim(),

});



import joi from 'joi';

export const singupUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    passwordConfirm: joi.string().valid(joi.ref('password')).required()
});


export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});


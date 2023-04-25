import joi from 'joi';

export const singupUserSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required().trim(),
    password: joi.string().min(3).required().trim(),
    passwordConfirm: joi.string().valid(joi.ref('password')).required().trim()
});


export const loginSchema = joi.object({
    email: joi.string().email().required().trim(),
    password: joi.string().required().trim(),
});


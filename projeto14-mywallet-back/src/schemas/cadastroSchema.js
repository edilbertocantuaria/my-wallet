import joi from 'joi';

const cadastroSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    passwordConfirm: joi.string().valid(joi.ref('password')).required()
});

export default cadastroSchema;
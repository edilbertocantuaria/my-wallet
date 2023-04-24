import cadastroSchema from "../schemas/cadastroSchema.js";

export default function loginSchemaValidationMiddleware(req, res, next) {
    const validation = cadastroSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send("cadastro middleware");
    }

    next();
}
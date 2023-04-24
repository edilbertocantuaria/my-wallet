import db from "../db.js";
import bcrypt from 'bcrypt';
import cadastroSchema from '../schemas/cadastroSchema.js';

export async function postUser(req, res) {

    const { name, email, password, passwordConfirm } = req.body;
    const user = { name, email, password, passwordConfirm };
    console.log(user);

    const userAlreadyRegistered = await db.collection('users').findOne({ email: email });
    if (userAlreadyRegistered) return res.sendStatus(409);
    console.log(userAlreadyRegistered);

    const validation = cadastroSchema.validate(user);
    if (validation.error) return res.sendStatus(422);
    console.log(validation);

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await db.collection("users").insertOne({
        name: name.trim(),
        email: email.trim(),
        password: passwordHash.trim()
    });



    res.status(201).send("New user created successfully");

}
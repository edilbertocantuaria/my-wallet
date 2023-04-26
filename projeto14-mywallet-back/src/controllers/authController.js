import db from "../db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { singupUserSchema, loginSchema } from '../schemas/authSchema.js';


export async function singupUser(req, res) {

    const { name, email, password, passwordConfirm } = req.body;
    const user = { name, email, password, passwordConfirm };

    const userAlreadyRegistered = await db.collection('users').findOne({ email: email });
    if (userAlreadyRegistered) return res.sendStatus(409);

    const validation = singupUserSchema.validate(user);
    if (validation.error) return res.sendStatus(422);

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await db.collection("users").insertOne({
        name: name.trim(),
        email: email.trim(),
        password: passwordHash.trim()
    });



    res.status(201).send("New user created successfully");

}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    const validation = loginSchema.validate({ email, password });
    if (validation.error) return res.status(422).send("validation");

    const user = await db.collection('users').findOne({ email: email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();

        await db.collection('sessions').insertOne({
            token: token,
            userId: user._id
        })
        console.log(user);
        console.log(token);
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);

        res.status(200).send({ user, token });

    } else {
        if (!user) {
            return res.sendStatus(404);
        }
        return res.sendStatus(401);
    }
}
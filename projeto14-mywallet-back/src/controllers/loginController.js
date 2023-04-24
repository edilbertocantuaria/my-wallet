import db from "../db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import loginSchema from '../schemas/loginSchema.js';

export async function loginUser(req, res) {
    const { email, password } = req.body;

    const validation = loginSchema.validate({ email, password });
    if (validation.error) return res.status(422).send("validation");

    const user = await db.collection('users').findOne({ email: email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();

        await db.collection("sessions").insertOne({
            token,
            userId: user._id
        })
        res.status(200).send(token);
    } else {
        if (!user) {
            return res.sendStatus(404);
        }
        return res.sendStatus(401);
    }
}

import db from "../db.js";
import dayjs from "dayjs"
import "dayjs/locale/pt-br.js";
import { transactionSchema } from '../schemas/transactionSchema.js';
//import { ObjectId } from "mongodb"

export async function transactionOperation(req, res) {

    const { value, description } = req.body;
    const { userId } = res.locals.session
    const transaction = { value, description };

    const { operation } = req.params;

    const validation = transactionSchema.validate(transaction);

    if (validation.error) return res.status(422).send(validation.error);

    const day = new Date();
    const valueNumber = Number(value);

    dayjs.locale('pt-br');
    if (operation === "incomeEntrees") {
        await db.collection("incomeEntrees").insertOne({
            userId: userId,
            date: dayjs(day).format('DD/MM'),
            time: dayjs(day).format("HH:mm:ss"),
            operation: operation,
            value: valueNumber,
            description: description.trim(),
        });
        res.status(201).send("New transaction created successfully");

    } else if (operation === "expenses") {
        await db.collection("expenses").insertOne({
            userId: userId,
            date: dayjs(day).format('DD/MM'),
            time: dayjs(day).format("HH:mm:ss"),
            operation: operation,
            value: valueNumber,
            description: description.trim(),
        });
        res.status(201).send("New transaction created successfully");
    } else {
        return res.status(400).send("Operação inválida!")
    }
}

export async function allTransactions(req, res) {
    try {
        const incomeEntrees = await db.collection("incomeEntrees").find({ userId }).toArray();
        const expenses = await db.collection("expenses").find({ userId }).toArray();
        const transactions = [...incomeEntrees, ...expenses];
        res.status(200).send(transactions);

    } catch (err) {
        res.status(500).send(message.err);
    }

}
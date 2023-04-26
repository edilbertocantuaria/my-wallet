import db from "../db.js";
import dayjs from "dayjs"
import "dayjs/locale/pt-br.js";
import { transactionSchema } from '../schemas/transactionSchema.js';

export async function transactionOperation(req, res) {

    const { value, description } = req.body;
    const transaction = { value, description };

    const { operation } = req.params;

    const validation = transactionSchema.validate(transaction);

    if (validation.error) return res.status(422).send(validation.error);

    const day = new Date();
    const valueNumber = Number(value);

    if (operation === "incomeEntrees") {
        dayjs.locale('pt-br');


        await db.collection("incomeEntrees").insertOne({
            date: dayjs(day).format('DD/MM'),
            time: dayjs(day).format("HH:mm:ss"),
            operation: operation,
            value: valueNumber,
            description: description.trim(),
        });
        res.status(201).send("New transaction created successfully");

    } else if (operation === "expenses") {
        await db.collection("expenses").insertOne({
            date: dayjs(day).format('DD/MM'),
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
        const incomeEntrees = await db.collection("incomeEntrees").find().toArray();
        const expenses = await db.collection("expenses").find().toArray();
        const transactions = [...incomeEntrees, ...expenses];
        res.status(200).send(transactions);

    } catch (err) {
        res.status(500).send(message.err);
    }

}
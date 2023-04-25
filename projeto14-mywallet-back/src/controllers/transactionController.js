import db from "../db.js";
import dayjs from "dayjs"
import { transactionSchema } from '../schemas/transactionSchema.js';

export async function transactionOperation(req, res) {

    const { value, description } = req.body;
    const transaction = { value, description };

    const { operation } = req.params;

    const validation = transactionSchema.validate(transaction);

    if (validation.error) return res.status(422).send(validation.error);

    const day = Date.now()
    const valueNumber = Number(value);

    if (operation === "incomeEntrees") {

        await db.collection("incomeEntrees").insertOne({
            date: dayjs(day).format('DD/MM'),
            operation: operation,
            value: valueNumber,
            description: description.trim(),
        });
        res.status(201).send("New transaction created successfully");

    } else if (operation==="expenses"){
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
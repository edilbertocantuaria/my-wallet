import express from 'express';
import router from './routes/routesIndex.js';
import chalk from 'chalk';

/*import dayjs from 'dayjs';
import "dayjs/locale/pt-br.js";


dayjs.locale('pt-br');*/

const app = express();
app.use(express.json());

app.use(router);


const PORT = 5000;
app.listen(PORT, () => {
    console.log(chalk.green(`Rodando em http://localhost:${PORT}`));
});

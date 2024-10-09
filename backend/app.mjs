//se importa el framework express para levantar el servidor
import express from 'express';
import cors from 'cors'; //cors para políticas
import bodyParser from 'body-parser';

//Se realiza una instancia de express
export const app = express();

//Usando los middlewares
app.use(express.json()); //Middleware que comprueba si la request es json y si es de tipo post, luego convierte el body de la req a json
app.use(bodyParser.json({limit: '15mb'}));
app.use(cors());

//Importación de endpoints
import {router} from './routes/routes.mjs';

app.use(router);

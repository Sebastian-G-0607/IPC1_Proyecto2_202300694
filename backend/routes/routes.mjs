//instancia del framework express
import express from 'express';

//Objeto para hacer rutas
export const router = express.Router();

//Importando los controladores
import { login } from '../controllers/consultas.mjs';

//Creando los endpoints

router.post('/login', login);
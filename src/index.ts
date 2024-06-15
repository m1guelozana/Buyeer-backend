import express from 'express';
import { PrismaClient } from '@prisma/client';
import routes from './router/router';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://buyeer.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Origin',
    'Accept',
    'X-Access-Token',
    'x-device-id', // Adicione x-device-id aos cabeçalhos permitidos
  ],
  exposedHeaders: ['x-device-id'], // Exponha x-device-id para que o navegador possa acessá-lo
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

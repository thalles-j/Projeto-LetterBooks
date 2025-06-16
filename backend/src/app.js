import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { PrismaClient } from '@prisma/client';

const app = express();
routes(app);
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());



export default app;
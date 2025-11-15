import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFound } from './app/middlewares/norFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const message = `Rentezzi server ${req.url}`;
  res.send(message);
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;

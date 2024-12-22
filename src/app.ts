import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application routes

app.use('/api', router);

const test = async (req: Request, res: Response) => {
  res.send('Hello World');
};

app.get('/', test);

// error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);
export default app;

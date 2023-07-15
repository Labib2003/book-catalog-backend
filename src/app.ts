import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import routes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Visit /api/vi/ to access the apis.');
});

//global error handler
app.use(globalErrorHandler);

//not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    sucess: false,
    message: 'Route not Found',
    errorMessages: [
      {
        path: req.originalUrl + ' not found',
        message: 'Route not Found',
      },
    ],
  });
  next();
});

export default app;

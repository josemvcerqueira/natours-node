import express from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tour.routes';
import userRouter from './routes/user.routes';
import AppError from './utils/app-error';
import globalErrorHandler from './controllers/error.controllers';

const app = express();

// 1 Migglewares
if (process.env.NODE_ENV === 'development') app.use(morgan('tiny'));

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // if you pass an arg to next it assumes its an error and skips all middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;

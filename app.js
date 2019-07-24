import express from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tour.routes';
import userRouter from './routes/user.routes';

const app = express();

// 1 Migglewares
if (process.env.NODE_ENV === 'development') app.use(morgan('tiny'));

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('hello from the middleware 🙂');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;

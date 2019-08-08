import path from 'path';

import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import tourRouter from './routes/tour.routes';
import userRouter from './routes/user.routes';
import reviewRouter from './routes/review.routes';
import bookingRouter from './routes/booking.routes';
import viewRouter from './routes/view.routes';
import AppError from './utils/app-error';
import globalErrorHandler from './controllers/error.controllers';

const app = express();

app.set('view engine', 'pug', { pretty: true });
app.set('views', path.join(__dirname, 'views'));

// Global Migglewares

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('tiny'));

// Limit requests from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query infection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Clean parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // if you pass an arg to next it assumes its an error and skips all middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;

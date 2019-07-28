import './env';
import mongoose from 'mongoose';
import app from './app';
import AppError from './utils/app-error';

process.on('uncaughtException', error => {
  console.log('UNCAUGHT EXCEPTION! 🔥 Shutting down...');
  console.log(error.name, error.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful'))
  .catch(
    error => new AppError(`DB connection unsuccessful: ${error.message}`, 500),
  );

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', error => {
  console.log('UNHANDLED REJECTION! 🔥 Shutting down...');
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

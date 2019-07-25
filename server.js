import './env';
import mongoose from 'mongoose';
import app from './app';

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
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

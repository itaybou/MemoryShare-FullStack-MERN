import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const MB_LIMIT = '30mb';
dotenv.config();

const app = express();

app.use(
  express.json({
    limit: MB_LIMIT,
    extended: true,
  }),
);
app.use(
  express.urlencoded({
    limit: MB_LIMIT,
    extended: true,
  }),
);
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`Server running on port: ${PORT}`),
    );

    const shutDown = () => {
      server.close();
      process.exit(0);
    };

    process.on('SIGUSR2', shutDown);
    process.on('SIGTERM', shutDown);
    process.on('SIGINT', shutDown);
  })
  .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);

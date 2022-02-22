import express from 'express';
import routes from './routes/index';
const app = express();
const PORT = 8000;

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`working on ${PORT}`);
});

export default app;


import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.send('Home page');
});

app.listen(3000, () => {
  console.log('server started');
});

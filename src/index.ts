import express, { Request, Response } from 'express'

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (request: Request, response: Response) => {
  response.send('Hello world!');
});

app.get('/open-api/test', (request: Request, response: Response) => {
  response.json({test: 42});
});

app.listen(port, () => console.log(`Running on port ${port}`));

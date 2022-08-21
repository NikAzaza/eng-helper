import { Container } from 'typedi';
import { createExpressServer, useContainer } from 'routing-controllers';
import 'reflect-metadata';

const port = process.env.PORT || 5000;
useContainer(Container);

// TODO: add logs
const app = createExpressServer({
  controllers: [__dirname + '/controllers/**/*.js'],
});

app.listen(port, () => console.log(`Running on port ${port}`));

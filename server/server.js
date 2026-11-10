import express from 'express';
import cors from 'cors';
import router from './routes/stories.routes.js';

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

app.use(cors());

app.use('/', router);

app.listen(port, hostname, () => {
    console.log(`Listening on port ${port}`)
});
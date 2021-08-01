import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import methodOverride from 'method-override'
import cors from 'cors'

const app = express();

import('./config/database.js')

import { router as usersRouter } from './routes/users.js'
import { router as authRouter } from './routes/auth.js'



app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'build')));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, ()=> {
  console.log(`Express is listening on port ${port}.`)
});

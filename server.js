import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import methodOverride from 'method-override'
import cors from 'cors'

const app = express();

import('./config/database.js')

import { router as profilesRouter } from './routes/profiles.js'
import { router as authRouter } from './routes/auth.js'
import { router as mediaRouter } from './routes/media.js'
import { router as reviewsRouter } from './routes/reviews.js'

app.use(cors());
app.use(logger('dev'));
app.use(express.json());


app.use('/api/profiles', profilesRouter);
app.use('/api/auth', authRouter);
app.use('/api/media', mediaRouter);
app.use('/api/reviews', reviewsRouter);

app.get('/*', function (req, res) {
  res.sendFile(
    path.dirname(fileURLToPath(import.meta.url), 'build', 'index.html')
  )
})
const port = process.env.PORT || 3001;

app.listen(port, ()=> {
  console.log(`Express is listening on port ${port}.`)
});

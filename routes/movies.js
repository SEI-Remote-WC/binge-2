import { Router } from 'express'
import * as moviesCtrl from '../controllers/movies.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

export {
  router
}

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/search/:query', checkAuth, moviesCtrl.search)
router.get('/searchOne/:id', checkAuth, moviesCtrl.searchOne)
router.get('/searchSimilar/:id', checkAuth, moviesCtrl.searchSimilar)
router.get('/searchGenre/:id', checkAuth, moviesCtrl.searchGenre)


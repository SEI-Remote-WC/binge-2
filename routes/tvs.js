import { Router } from 'express'
import * as tvsCtrl from '../controllers/tvs.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

export {
  router
}

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/search/:query', checkAuth, tvsCtrl.search)
router.get('/searchOne/:id', checkAuth, tvsCtrl.searchOne)
router.get('/searchSimilar/:id', checkAuth, tvsCtrl.searchSimilar)
router.get('/searchGenre/:id', checkAuth, tvsCtrl.searchGenre)



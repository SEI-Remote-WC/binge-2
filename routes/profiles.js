import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

export {
  router
}

const router = Router();

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get("/", checkAuth, profilesCtrl.index)
router.get("/userProfile", checkAuth, profilesCtrl.userProfile)
router.get('/getRecent', checkAuth, profilesCtrl.getRecent)
router.patch("/friend/:id", checkAuth, profilesCtrl.friend)
router.patch("/unfriend/:id", checkAuth, profilesCtrl.unfriend)
router.patch('/addMedia', checkAuth, profilesCtrl.addMedia)
router.patch('/removeMedia', checkAuth, profilesCtrl.removeMedia)




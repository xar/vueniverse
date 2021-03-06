import { Router } from 'express'
import usersRoutes from './users/routes'
import adminRoutes from './admin/routes'
import listEndpoints from 'express-list-endpoints'
import authenticate from '~middleware/authenticate'
const router = Router()

// Add USERS Routes
router.use('/users', usersRoutes)
router.use('/admin', authenticate, adminRoutes) // required admin permissions...

router.get('/', (req, res) => {
  res.json(listEndpoints(router))
})

export default router

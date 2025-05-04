import express from 'express'
const router = express.Router()
import UsersRoute from './users.js' 
import ProductsRoute from './products.js' 
import loginRoute from './login.js'

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'From /api endpoint.'
    })
})

router.use('/users', UsersRoute)
router.use('/products', ProductsRoute)
router.use('/login', loginRoute)

export default router
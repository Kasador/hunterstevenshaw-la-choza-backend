import express from 'express'
const router = express.Router()
import UsersRoute from './users.ts' 
import ProductsRoute from './products.ts' 
import loginRoute from './login.ts'

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
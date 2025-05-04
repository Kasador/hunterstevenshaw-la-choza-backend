// const router = require('express').Router();
import { Router } from 'express'
import { loginUser } from '../controller/loginController.js'
const router = Router()

router.post('/', loginUser)

export default router
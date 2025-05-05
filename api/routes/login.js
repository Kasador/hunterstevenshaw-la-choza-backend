// const router = require('express').Router();
import { Router } from 'express'
import { loginUser } from '../controller/loginController.js'
const router = Router()

// /api/login/
router.post('/', loginUser)

export default router
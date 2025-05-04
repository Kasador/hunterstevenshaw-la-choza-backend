// const router = require('express').Router();
import { Router } from 'express';
import { getAllUsers, addUser } from '../controller/usersController'
const router = Router();

router.get('/', getAllUsers)
router.get('/admin', addUser)

export default router;
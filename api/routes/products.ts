// const router = require('express').Router();
import { Router } from 'express';
import { getAllProducts } from '../controller/productsController.ts'
const router = Router();

router.get('/', getAllProducts)

export default router;
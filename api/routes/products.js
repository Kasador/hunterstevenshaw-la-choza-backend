// const router = require('express').Router();
import { Router } from 'express';
import { getAllProducts } from '../controller/productsController.js'
const router = Router();

// /api/products/
router.get('/', getAllProducts)

export default router;
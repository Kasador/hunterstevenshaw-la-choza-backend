// const router = require('express').Router();
import { Router } from 'express';
import {
    getAllUsers,
    getUser,
    addUser,
    addAdmin,
    updateUser,
    removeUser
  } from '../controller/usersController.js';
  
const router = Router();

// /api/users/
router.get('/', getAllUsers);             // GET all users
router.get('/:id', getUser);              // GET user by ID
router.post('/', addUser);                // POST new user
router.post('/admin', addAdmin);          // POST one-time admin creation
router.put('/:id', updateUser);           // PUT update user
router.delete('/:id', removeUser);        // DELETE user

export default router;
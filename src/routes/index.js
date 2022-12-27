import express from 'express';
import adminsRouter from './Admins.js';
import productsRouter from './Products.js';

const router = express.Router();

router.use('/products', productsRouter);
router.use('/admins', adminsRouter);

export default router;

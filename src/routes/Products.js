const express = require('express');
const router = express.Router();
const {getAll,createProduct,updateProduct,removeProduct,getById} = require('../controllers/Products');

// PING
router.get('/',(req,res)=>res.send('DB Connected Succesfuly'));
// ALL PRODUCTS  
router.get('/products',getAll);
// PRODUCTS BY ID
router.get('/product/:_id',getById);
//  CREATE PRODUCT
router.post('/product/add',createProduct);
// UPDATE PRODUCT
router.put('/product/update/:_id',updateProduct);
// DELETE PRODUCT
router.delete('/product/delete/:_id',removeProduct);



module.exports=router;
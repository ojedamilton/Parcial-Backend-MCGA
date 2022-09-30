const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

// PING
router.get('/',(req,res)=>res.send('DB Connected Succesfuly'));
//  CREATE PRODUCTS
router.post('/product/add',(req, res) => {
    const {_id,name,price,stock,description}=req.body;  
    const newProvider = {_id,name,price,stock,description};
    Products.create(newProvider)
      .then((data) => res.status(201).json({ msg: "Provider added: ", data , error:false }))
      .catch((err) => res.status(500).json({ msg: `Error: ${err}`,data:{},error:true }));
  });
// ALL PRODUCTS  
router.get('/products',(req, res) => {
            Products.find()
                .then((data) => res.status(200).json({msg:"All Provider",data,error:false }))
                .catch((err) => res.status(500).json({ msg: `Error: ${err}`,data:{},error:true }));
});


module.exports=router;
const Products = require('../models/Products');

//  CREATE PRODUCTS
const createProduct = (req, res) => {
    const {_id,name,price,stock,description}=req.body;  
    const newProvider = {_id,name,price,stock,description};
    Products.create(newProvider)    
      .then((data) => res.status(201).json({ msg: "Products added: ", data , error:false }))
      .catch((err) => res.status(500).json({ msg: `Error: ${err}`,data:{},error:true }));
  };

// GET ALL PRODUCTS
const getAll = (req, res) => {
Products.find()
    .then((data) => res.status(200).json({msg:"All Products",data,error:false }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`,data:{},error:true }));
}
// GET BY ID PRODUCT
const getById = (req, res) => {
    const { _id } = req.params;
    Products.findById(parseInt(_id))
        .then((data) => res.status(200).json({msg:"Product By Id",data,error:false }))
        .catch((err) => res.status(500).json({ msg: `Error: ${err}`,data:{},error:true }));
    }
// REMOVE PROVIDER
const removeProduct = (req, res) => {
const { _id } = req.params;
Products.findByIdAndUpdate( parseInt(_id), { isDeleted: true }, { new: true })
    .then((data) => {
    if (data.length === 0) return res.status(404).json({ msg: `Products not found by ID: ${id}`,data:{},error:true });
    return res.status(202).json({ msg: "Products deleted", data ,error:false});
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` ,data:{},error:true}));
};

// UPDATE PROVIDER
const updateProduct= (req, res) => {
const { _id } = req.params;
Products.findByIdAndUpdate(parseInt(_id), req.body, { new: true })
    .then((data) => {
    if (data.length === 0) return res.status(404).json({ msg: `Products not found by ID: ${_id}`,data:{},error:true });
    return res.status(202).json({ msg: "Products updated", data , error:false });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` ,data:{},error:true }));
};
  // EXPORTS ALL

  module.exports = {
    getAll,
    createProduct,
    updateProduct,
    removeProduct,
    getById, 
  }; 

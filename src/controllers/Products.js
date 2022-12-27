import Products from '../models/Products.js';

//Get All
const getAll = (req, res) => {
    Products.find({isDeleted: false})
        .then((data) => res.status(200).json({ msg: "All Products", data, error: false }))

        .catch((err) => res.status(500).json({ msg: `Error: ${err}`, data: {}, error: true }));
};

//Get
const getId = (req, res) => {
    const { _id } = req.params;
    Products.findById(parseInt(_id))
        .then((data) => {
            if (!data) {
                return res.status(404).json({msg: "Product not found"})
            };
            res.status(200).json({ msg: "Product by Id", data, error: false })
        })
        .catch((err) => res.status(500).json({ msg: `Error: ${err}`, data: {}, error: true }));
};

// Post
const postProduct = (req, res) => {
    const {name, price, stock, description } = req.body;
    const sumLastId= Products.find().sort({$natural:-1}).limit(1)
                .then((data)=> {
                    const newProduct = { _id:data[0]._id+1, name, price, stock, description };
                    Products.create(newProduct)
                        .then((data) => res.status(201).json({ msg: "Product added: ", data, error: false }))
                        .catch((err) => res.status(500).json({ msg: `Error: ${err}`, data: {}, error: true }));
                    })
                    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, data: {}, error: true }));
};

// Update
const updateProduct = (req, res) => {
    const { _id } = req.params;
    Products.findByIdAndUpdate(parseInt(_id), req.body, { new: true })
        .then((data) => {
            if (!data || data.length === 0) return res.status(404).json({ msg: `Product not found by ID: ${_id}`, data: {}, error: true });
            return res.status(202).json({ msg: "Product updated", data, error: false });
        })
        .catch((err) => res.status(500).json({ msg: `Error: ${err}`, data: {}, error: true }));
};

// Delete
const deleteProduct = (req, res) => {
    const { _id } = req.params;
    Products.findByIdAndUpdate(parseInt(_id), { isDeleted: true })
        .then((data) => {
            if (!data || data.length === 0) return res.status(404).json({ msg: `Product not found by ID: ${id}`, data: {}, error: true });
            // return res.status(202).json({ msg: "Product deleted", data, error: false });
            Products.find({isDeleted: false})
            .then((data) => res.status(202).json({ msg: "All Products", data, error: false }))

            .catch((err) => res.status(500).json({ msg: `Error: ${err}`, data: {}, error: true }));
        })
        .catch((err) => res.status(500).json({ msg: `Error: ${err}`, data: {}, error: true }));
};

// Exports
export default {
    getAll,
    getId,
    postProduct,
    updateProduct,
    deleteProduct
};

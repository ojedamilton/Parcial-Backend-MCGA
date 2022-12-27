import mongoose from 'mongoose';
// import Decimal128 from 'mongoose';

const { Schema } = mongoose;

const ProductsSchemas = new Schema({
    _id:{
        type: Number
    },
    name:{
        type: String,
        required: true,
        maxlenght: 50
    },
    price:{
        type: Number,
        maxlenght: 14,
        min: 0,
    },
    stock:{
        type: Number,
        maxlenght: 14,
        min: 0,
    },
    description:{
        type: String,
        maxlenght: 200,
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Products", ProductsSchemas);
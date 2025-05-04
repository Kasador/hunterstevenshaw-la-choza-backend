import mongoose from 'mongoose'
// const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Products = mongoose.model("Products", productSchema); // defining the 'Users' model

export default Products

/* References >>>
    1) https://www.w3schools.com/mongodb/mongodb_schema_validation.php
    2) https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
    3) https://www.mongodb.com/docs/manual/core/schema-validation/
    4) https://stackoverflow.com/questions/66383516/add-mongoose-validation-for-phone-numbers
    5) https://www.geeksforgeeks.org/mongoose-schematype/
    6) https://mongoosejs.com/docs/guide.html
*/
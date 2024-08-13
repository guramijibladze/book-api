const mongoose = require('mongoose')

const BookSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required:[true, "Please enter book name!!"]
        },

        author: {
            type:String,

        }, 

        price: {
            type:Number,
            default:0
        }
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", BookSchema)
module.exports = Book
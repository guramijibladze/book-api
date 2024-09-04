const Book = require('../models/books.model')
const auth = require('../controllers/register-login.controller')

const createBook = async(req, res) => {
    try {
        const book = await Book.create(req.body)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllBooks = async(req, res) => {
  
    try {
        console.log(req.query.page)
        let page = req.query.page;
        let limit = req.query.limit;
        let skip = (page - 1) * limit

        const totalBooks = await Book.countDocuments({});

        const books = await Book.find({}).skip(skip).limit(limit)
        res.status(200).json({books, totalBooks, page, limit })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getOneBook = async(req, res) => {
    try {
        const bookWithId = await Book.findById(req.params.id)

        if(!bookWithId){
            return res.status(404).json({message: 'book not found'})
        }

        res.status(200).json(bookWithId)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateBook = async(req, res) => {
    try {
        const bookWithId = await Book.findByIdAndUpdate(req.params.id, req.body)
       
        if(!bookWithId){
            return res.status(404).json({message: 'book not found'})
        }

        res.status(200).json(bookWithId)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteBook = async(req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)

        if(!deletedBook){
            return res.status(404).json({message: 'book not found'})
        }

        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getOneBook,
    updateBook,
    deleteBook
};
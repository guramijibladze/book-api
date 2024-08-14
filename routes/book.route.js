const express = require("express")
const router = express.Router()
const {helloNode, createBook, getAllBooks, getOneBook, updateBook, deleteBook} = require('../controllers/book.controller')

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getOneBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook)

module.exports = router;
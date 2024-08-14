const express = require("express")
const router = express.Router()
const { createBook, getAllBooks, getOneBook, updateBook, deleteBook} = require('../controllers/book.controller')
const { register, userLogin } = require('../controllers/register-login.controller')

router.post('/', createBook);
router.post('/createUser', register);
router.post('/login', userLogin);

router.get('/', getAllBooks);
router.get('/:id', getOneBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook)


module.exports = router;
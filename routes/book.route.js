const express = require("express")
const router = express.Router()
const { createBook, getAllBooks, getOneBook, updateBook, deleteBook} = require('../controllers/book.controller')
const { register, userLogin } = require('../controllers/register-login.controller')
const { auth } = require('../controllers/register-login.controller')


router.post('/createUser', register);
router.post('/login', userLogin);
router.post('/', auth, createBook);

router.get('/', getAllBooks);
router.get('/:id', getOneBook);

router.put('/:id', auth, updateBook);

router.delete('/:id', auth, deleteBook)


module.exports = router;
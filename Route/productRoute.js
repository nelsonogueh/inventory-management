const express = require('express');
const productController = require('../controller/productController');
const auth = require('../middleware/authController')
const multer = require('multer')
const utils = require('../utils/utils')
const uploads = multer({storage: utils.fileStorageEngine})


const Router = express.Router();
Router.use(express.urlencoded({extended: true}))
Router.use(express.json())


Router.get('/my-products/', auth, productController.getProducts) // Fetch current user products route handler

Router.get('/product/:id', auth, productController.getSingleProduct) // Fetch single product route handler

Router.post('/', auth, uploads.single('image'), productController.addProduct) // Add new product route handler

Router.put('/product/update/:id', auth, productController.updateProduct) // Update product route handler

Router.delete('/product/delete/:id', auth, productController.deleteProduct) // Delete product route handler


module.exports = Router;
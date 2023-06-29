const express = require('express');
const router = express.Router();
const PublicControllers = require('../controllers/publicControllers');
const userControllers = require('../controllers/userControllers')
const adminController = require('../controllers/adminControllers')
const {authenticateToken_user} = require('../middleware/authenticateToken_user')
const {authenticateToken_admin} = require('../middleware/authenticateToken_admin')
const upload = require('../images/storage')

// public controllers
router.get('/allproducts', PublicControllers.allProducts);
router.get('/allcategories', PublicControllers.allCategories);
router.get('/allnavbars', PublicControllers.allNavbars);
router.get('/product/:product_id', PublicControllers.product);
router.get('/navbars', PublicControllers.navbars);
router.get('/categories/:category', PublicControllers.categories);
router.get('/categoryId/:category_id', PublicControllers.categoryId)
router.get('/navbarId/:navbar_id', PublicControllers.navbarId)
router.get('/verify/:token', PublicControllers.verify);
router.get('/images/:name', PublicControllers.images);
router.post('/register', PublicControllers.register);
router.post('/login', PublicControllers.login);

// user controllers
router.post('/addcart', authenticateToken_user, userControllers.addCart);
router.post('/deletecart', authenticateToken_user, userControllers.deleteCart);
router.get('/userbuys/:cart_id', authenticateToken_user, userControllers.userBuys);
router.delete('/deletebuy', authenticateToken_user, userControllers.deleteShCart);

// admin controllers
router.post('/addcategory', authenticateToken_admin, adminController.addCategory);
router.post('/addnavbar', authenticateToken_admin, adminController.addNavbar);
router.post('/addproduct', authenticateToken_admin, adminController.addProduct);
router.post('/upload', upload.single('image'), adminController.upload);
router.delete('/deleteproduct', authenticateToken_admin, adminController.deleteProduct);
router.delete('/deletecategory', authenticateToken_admin, adminController.deleteCategory);
router.delete('/deletenavbar', authenticateToken_admin, adminController.deleteNavbar);
router.delete('/deleteimage', authenticateToken_admin, adminController.imagesdelete);
router.put('/updateproduct/:product_id', authenticateToken_admin, adminController.updateProduct);
router.put('/updatecategory/:category_id', authenticateToken_admin, adminController.updateCategory);
router.put('/updatenavbar/:navbar_id', authenticateToken_admin, adminController.updateNavbar);


module.exports = router;
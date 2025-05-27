const express = require('express');
const router = express.Router();


const authController = require('../controllers/authController');


console.log('Loaded controller:', authController);
console.log('register:', authController.register);
console.log('login:', authController.login);


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;

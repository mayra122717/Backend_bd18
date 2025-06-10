const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/login', authController.login);
router.get('/dashboard',verifyToken,(req,res)=>{
    res.json({message:`Bienvenido usuario`})
})

module.exports = router;
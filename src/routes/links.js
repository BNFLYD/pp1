const express = require('express');
const router = express.Router();
// const pool = require('../db');

router.get('/add', (req,res) => {
    const usua = req.flash('user')
    res.render('calc/add');
    console.log(usua)
});

module.exports = router;
const express = require('express');
const router = express.Router();

let path = __dirname + '/views/';


router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'views', 'subdir', 'index3.html'));
});

router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'templates', 'views', 'subdir', 'test.html'));
});

module.exports = router;
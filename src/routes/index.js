const express = require('express');
const ulrShortner = require('../controllers/urlShortner');

const router = express.Router();
router.post('/url/shorten', ulrShortner.createShortUrl);
router.get('/url/:id', ulrShortner.getByUniqueId);
router.get('/all-urls', ulrShortner.getAllUrls);

module.exports = router;
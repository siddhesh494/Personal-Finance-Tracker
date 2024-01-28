var express = require('express');
var router = express.Router();
const { addFinance } = require('../controllers/add-finance')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', addFinance);

module.exports = router;

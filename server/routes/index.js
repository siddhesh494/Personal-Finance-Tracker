var express = require('express');
var router = express.Router();
const { addTransaction } = require('../controllers/transection')
const { getFinanceCategory } = require('../controllers/finance-category')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getFinanceCategory', getFinanceCategory);

router.post('/addTransection', addTransaction);

module.exports = router;

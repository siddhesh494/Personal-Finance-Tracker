var express = require('express');
var router = express.Router();
const { addFinance } = require('../controllers/add-finance')
const { getFinanceCategory } = require('../controllers/finance-category')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getFinanceCategory', getFinanceCategory);

router.post('/addFinance', addFinance);

module.exports = router;

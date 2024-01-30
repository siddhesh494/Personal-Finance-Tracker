var express = require('express');
var router = express.Router();
const { addTransaction, getTransactionHistory } = require('../controllers/transection')
const { getFinanceCategory } = require('../controllers/finance-category');
const { getPresentExpenses, getExpensesByYear, getExpensesByMonth } = require('../controllers/expenses');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getFinanceCategory', getFinanceCategory);

router.post('/addTransection', addTransaction);
router.get('/getTransactionHistory', getTransactionHistory);

router.get('/getPresentExpenses', getPresentExpenses);
router.get('/getExpensesByYear', getExpensesByYear);
router.get('/getExpensesByMonth', getExpensesByMonth);




module.exports = router;

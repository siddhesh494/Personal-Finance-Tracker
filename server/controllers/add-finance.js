
async function addFinance(req, res) {
  try {
    // const [result] = await connection.query("select * from finance_category")
    console.log(result)
    res.json({
      success: true,
      status: 200,
      msg: "Added successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: true,
      status: 500,
      msg: "Something went wrong!"
    })
  }
}

module.exports = {
  addFinance
}
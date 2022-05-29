let payMoney =  (req, res) => {
    return res.render("paymoney.ejs");
};


module.exports = {
    payMoney: payMoney,
};
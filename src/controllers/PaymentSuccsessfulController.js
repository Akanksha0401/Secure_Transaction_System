let PaymentSuccessful =  (req, res) => {
    return res.render("PaymentSuccessful.ejs");
};

module.exports = {
    PaymentSuccessful: PaymentSuccessful,
};
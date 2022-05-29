let payMoneyViacard =  (req, res) => {
    return res.render("cardPayment.ejs");
};


let checkFaceCard = (req, res) => {
    var carddata = {
        payAmount : req.body.amountfornetbanking,
        beneficiaryName : req.body.beneficiaryname
    }

    const { spawn } = require('child_process');

    const childPython = spawn('python', ['face-recognition/face_recognition.py'])

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data)=> {
        console.error(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`child process existed with code ${code}`);
        
        if(code == 0)
        {
            console.log(`child process existed with code ${code}`);
            return res.redirect("/paymoney/card/paymentsuccessful");
        }
        else
        {
            console.log(`child process existed with code ${code}`);
            return res.redirect("/paymoney/card");
        }
    
    });


}

module.exports = {
    payMoneyViacard: payMoneyViacard,
    checkFaceCard: checkFaceCard
};
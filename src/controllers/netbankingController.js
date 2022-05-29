let payMoneyViaNetBanking =  (req, res) => {
    return res.render("netbanking.ejs");
};


let checkFaceNetBanking = (req, res) => {
    var nbdata = {
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
            return res.redirect("/paymoney/netbanking/paymentsuccessful");
        }
        else
        {
            console.log(`child process existed with code ${code}`);
            return res.redirect("/paymoney/netbanking");
        }
    
    });


}

module.exports = {
    payMoneyViaNetBanking: payMoneyViaNetBanking,
    checkFaceNetBanking: checkFaceNetBanking
};
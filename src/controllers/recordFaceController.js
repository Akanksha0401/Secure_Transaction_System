let recordFace =  (req, res) => {
    return res.render("recordface.ejs");
};

let recordfaceData = (req, res) => {
    var student = {
        first : req.body.firstname,
        last : req.body.lastname
    }

    var file_upload_name = student.first + student.last

    const { spawn } = require('child_process');

    const childPython = spawn('python', ['face-recognition/face_data.py', file_upload_name])

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
            return res.redirect("/");
        }
        else
        {
            console.log(`child process existed with code ${code}`);
            return res.redirect("/recordface");
        }
    });

}


module.exports = {
    recordFace: recordFace,
    recordfaceData: recordfaceData,
};
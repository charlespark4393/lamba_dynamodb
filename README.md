const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
var nodemailer = require('nodemailer');
var moment = require('moment');
const app = express();
app.use(cors({ origin: true }));

var transporter = nodemailer.createTransport({
    name: 'mail.ambridgelending.com',
    host: 'box1317.bluehost.com',
    port: 26,
    secure: false,
    auth: {=
    },
    tls: {rejectUnauthorized: false}
});

function pad(num, size = 2) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function convertToServerTimeZone(){
    //EST
    offset = -5.0
    clientDate = new Date();
    utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
    serverDate = new Date(utc + (3600000*offset));
    return serverDate
}

function getCurrentDate() {
    var d = convertToServerTimeZone()
    var dformat = [pad(d.getMonth()+1),
                 pad(d.getDate()),
                 d.getFullYear()].join('/')+' '+
                [pad(d.getHours()),
                 pad(d.getMinutes()),
                 pad(d.getSeconds())].join(':');
    return dformat
}

app.post('/sendEmail', (req, res) => {
    (async () => {
        try {
            const data = req.body
            const subject = `New CASTLE Decline Creditcard - TransID: ${data.transID}`
            const message = `
                <p>New CASTLE Decline Creditcard - TransID: <span STYLE="font-weight: 600">${data.transID}<span><p>

                <p>On <span STYLE="font-weight: 600">${getCurrentDate()}</span>, there was an error processing TRANS <span STYLE="font-weight: 600">${data.transID}</span>. Please check this issue in your Pineapple Payment dashboard.</p>
                
                <p>Timestamp: <span STYLE="font-weight: 600">${getCurrentDate()}</span></p>
                <p>Credit Card Number: <span STYLE="font-weight: 600">***${data.creditNumber}</span></p>
                <p>Status Code: <span STYLE="font-weight: 600">${data.statusCode}</span></p>
                <p>Status MSG: <span STYLE="font-weight: 600">${data.statusMsg}</span></p>
            `
            const to = ['contact@aikenrefuse.com', 'info@aikenrefuse.com', 'charlespark4393@gmail.com']
            var mailOptions = {
                from: 'customerPortal@aikenrefuse.com',
                to: to,
                subject: subject,
                html: message
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log('error', error)
                } else {
                    console.log('info', info)
                }
            })
            return res.status(200).send({
                ...data
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

exports.DeclinedEmail = functions.https.onRequest(app);

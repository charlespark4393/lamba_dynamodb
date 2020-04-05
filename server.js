const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const router = express.Router();
const port = 3000;
const lambda_url = 'https://wsg6f39psk.execute-api.us-west-1.amazonaws.com/dev'
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use( bodyParser.json({limit: '50mb'}) );
app.use(urlencodedParser);

router.post('/postCurrentLineTable', (req, res) => {
    const data = req.body
    axios.post(`${lambda_url}${req.route.path}`, {
        "FileId": data.FileId,
        "UserId": data.UserId,
        "LineNo": data.LineNo
    }).then((resp) => {
        res.send({
            success: 1,
            data: resp.data
        })
    }).catch((error) => {
        res.send({
            success: 0,
            data: error.response.data
        })
    })
})

router.post('/getCurrentLineTable', (req, res) => {
    const data = req.body
    axios.post(`${lambda_url}${req.route.path}`, {
        "FileId": data.FileId,
        "UserId": data.UserId,
    }).then((resp) => {
        res.send({
            success: 1,
            data: resp.data
        })
    }).catch((error) => {
        res.send({
            success: 0,
            data: error.response.data
        })
    })
})

router.post('/updateCurrentLineTable', (req, res) => {
    const data = req.body
    axios.post(`${lambda_url}${req.route.path}`, {
        "FileId": data.FileId,
        "UserId": data.UserId,
        "LineNo": data.LineNo
    }).then((resp) => {
        res.send({
            success: 1,
            data: resp.data
        })
    }).catch((error) => {
        res.send({
            success: 0,
            data: error.response.data
        })
    })
})

router.post('/deleteCurrentLineTable', (req, res) => {
    const data = req.body
    axios.post(`${lambda_url}${req.route.path}`, {
        "FileId": data.FileId,
        "UserId": data.UserId,
    }).then((resp) => {
        res.send({
            success: 1,
            data: resp.data
        })
    }).catch((error) => {
        res.send({
            success: 0,
            data: error.response.data
        })
    })
})

router.post('/postBookMarkTable', (req, res) => {
    const data = req.body
    axios.post(`${lambda_url}${req.route.path}`, {
        "FileId": data.FileId,
        "LineNo": data.LineNo,
    }).then((resp) => {
        res.send({
            success: 1,
            data: resp.data
        })
    }).catch((error) => {
        res.send({
            success: 0,
            data: error.response.data
        })
    })
})

router.post('/getBookMarkTable', (req, res) => {
    const data = req.body
    axios.get(`${lambda_url}${req.route.path}/${data.FileId}`, {
    }).then((resp) => {
        res.send({
            success: 1,
            data: resp.data
        })
    }).catch((error) => {
        res.send({
            success: 0,
            data: error.response.data
        })
    })
})

router.post('/deleteBookMarkTable', (req, res) => {
    const data = req.body
    axios.post(`${lambda_url}${req.route.path}`, {
        "FileId": data.FileId,
        "LineNo": data.LineNo,
    }).then((resp) => {
        res.send({
            success: 1,
            data: resp.data
        })
    }).catch((error) => {
        res.send({
            success: 0,
            data: error.response.data
        })
    })
})

app.use('/', router);

app.listen(port, () => console.log('SERVER NOW RUNNING...'));
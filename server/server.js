const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors({ origin : 'http://localhost:3000'}));
app.use(bodyParser.json());

app.use('/person', require('./route/personRoute'));

app.set('port', process.env.PORT || 3100);
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})



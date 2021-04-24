const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session        = require('express-session')
const matchController = require('./controllers/matchController');


require('./db/db');

app.use(express.json());


// const port = 4000;

app.use(cors());


app.use(bodyParser.urlencoded({extended: false}));

app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000');
  });

// app.get('/test', (req, res) => {
//     res.send("testing");// });


app.use('/ticTacToe', matchController)
// app.post("/match", (req, res) => {
//     console.log("req.body:", req.body);
//     Match.create(req.body).then((data) => {
//         res.send(data);
//     })
//     .catch((error) => {
//         res.send('could not create match');
//     });
// });
 
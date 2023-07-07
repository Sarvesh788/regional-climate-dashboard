const express = require('express')
const app = express()
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "weatherinfo",
})

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


db.getConnection((err) => {
    if(err) {
        console.log('Error connecting to Db');
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});


app.post('/api/insert', (req, res) => {
    const region_name = req.body.region_name;
    const Year = req.body.Year;
    const Month = req.body.Month;
    const Max_temperature = req.body.Max_temperature;
    const Normal = req.body.Normal;
    const Deviation = req.body.Deviation;
});



app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM max_temperature";
    db.query(sqlSelect, (err, result) => {  
        res.send(result);
    });
});

app.listen(3001, ()=>{ 
    console.log('running on port 3001');
});

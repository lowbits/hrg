const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const mysql      = require('mysql');

var env = process.env.NODE_ENV || 'development';
var config = require('../config')[env];

const connection = mysql.createConnection({
  host     : config.database.host,
  user     : config.database.user,
  password : config.database.password,
  database : config.database.database,
  port: config.database.port
});

const app = express()

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '../views'))

app.get('/', (request, response) => {
  response.render('home', {
    name: 'John'
  })
})

var employee = { name: 'pankaj2', passhash: 'india' };
connection.query('INSERT INTO user SET ?', employee, function(err,res){
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);

  // muss hier nur was anfügen für den Hackathon 

});

app.listen(3000)

const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')
const mysql      = require('mysql');

const connection = mysql.createConnection({
  port: 3308
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

var employee = { name: 'pankaj', passhash: 'india' };
connection.query('INSERT INTO user SET ?', employee, function(err,res){
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});

app.listen(3000)
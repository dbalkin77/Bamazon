const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazondb'
});

connection.connect(function(err){
if (err) throw err;
console.log(connection.threadId);

connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    productPurchase();
    });
});
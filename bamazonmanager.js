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
introduction();

});

// Function that prompts user to either view products for sale, view low inventory, add to inventory, or add new product
function introduction () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function(answer){
        if (answer.selection === 'View Products for Sale') {
            viewProducts();
        }
        else if (answer.selection === 'View Low Inventory') {
            viewLowInventory();
        }
        else if (answer.selection === 'Add to Inventory') {
            addToInventory();
        }
        else 
            addNewProduct();
    });
}

// View Products Function //////////////////////////////////////////////////
function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    introduction();
    });
}

// View Low Inventory //////////////////////////////////////////////////
function viewLowInventory() {
    var query = connection.query(
        "SELECT * FROM products WHERE stock_qty<5", function(err, res) {
            if (err) throw err;
            console.log(res);
        }
    )
}

// Add to Inventory //////////////////////////////////////////////////
function addNewProduct () {
    inquirer.prompt([
        {
            name: 'product',
            message: 'Name of product you would like to add to inventory'
        },
        {
            name: 'department',
            message: 'What department should item be added to?'
        },
        {
            name: 'price',
            message: 'Add price of item'
        },
        {
            name: 'quantity',
            message: 'Add quanity of item'
        }
    ]).then(function(data){
        console.log(data);
        connection.query('INSERT INTO products (product_name, department_name, price, stock_qty) VALUES (?,?,?,?)',
        [data.product, data.department, data.price, data.quantity],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedrows + ' rows affected');
        });
    })
}

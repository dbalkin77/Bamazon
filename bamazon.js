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

function productPurchase () {
    inquirer.prompt([
        {
           name: 'purchase',
           message: 'What is the ID of the product you would like to purchase?', 
        },
        {
            name: 'quantity',
            message: 'How many would you like to purchase?'
        }
    ]).then(function(data){
        console.log(data.purchase + ' ' + data.quantity);
        var purchase = data.purchase;
        var quantity = data.quantity;
        connection.query(`SELECT * FROM products WHERE item_id=${purchase}`, function (err, item){
            if (err) throw err;
            if (item[0].stock_qty - quantity >= 0) {
                console.log('Your purchase has been fulfilled');
                connection.query(
                    'UPDATE products SET ? WHERE ?',
                    [
                        {
                            stock_qty: item[0].stock_qty - quantity
                        },
                        {
                            item_id: purchase
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedrows + " rows impacted");``
                    }
                )
            }
            else {
                console.log('We do not carry that number of that item in stock');
            }
        })
    })
}



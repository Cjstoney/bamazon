var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected");
    customerGreeting();
});

function customerGreeting() {
    inquirer
        .prompt({
            name: "customerIntro",
            type: "list",
            message: "Hi, are you here to make a purchase?",
            choices: ["YES", "NO"]
        })
        .then(function (answer) {
            if (answer.customerIntro === "YES") {
                showProducts();
            }
            else {
                console.log("Sorry we couldn't be of more help. Please come back again.");
                connection.end();
            }
        })
}

function showProducts() {
    connection.query("SELECT id, product_name FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "product-choice",
                    type: "rawlist",
                    choices: function () {
                        var prodsArray = [];
                        for (var i = 0; i < results.length; i++) {
                            var id = results[i].id;
                            var name = results[i].product_name;
                            prodsArray.push(id, name);
                        }
                        return prodsArray;
                    },
                    message: "Please select the item that you are shopping for"
                }
            ])
            .then(function(answer){
                var 
            })
            // ask how many they would like.
    })
}
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
    // makeTable();
    console.log("connected");
    customerGreeting();
});

var makeTable = function () {
    connection.query("SELECT * FROM products", function (err, response) {
        for (var i = 0; i < response.length; i++) {
            console.log("We carry: " + "\n" + response[i].id + " || " + response[i].product_name + " || " + response[i].
                department_name + " || " + response[i].price + " || " + response[i].stock_quantity + "\n");
        }

        inquirer.prompt({
            name: "toPurchase",
            type: "input",
            message: "What would you like to purchase?"
        }).then(function (answer) {
            var isPoss = false
            for (var i = 0; i < response.length; i++) {
                if (response[i].product_name === answer.choice) {
                    isPoss = true;
                    console.log(isPoss);
                }

            }
        })
    })
}

function customerGreeting() {
    inquirer
        .prompt({
            name: "customerIntro",
            type: "input",
            message: "Hi, are you here to make a purchase?",
            choices: ["YES", "NO"]
        })
        .then(function (answer) {
            if (answer.customerIntro.toUpperCase() === "YES") {

                makeTable();
            }
            else {
                console.log("Sorry we couldn't be of more help. Please come back again.");
                connection.end();
            }
        })
}

// function showProducts() {
//     connection.query("SELECT id, product_name FROM products", function (err, results) {
//         if (err) throw err;
//         inquirer
//             .prompt([
//                 {
//                     name: "product-choice",
//                     type: "rawlist",
//                     choices: function () {
//                         var prodsArray = [];
//                         for (var i = 0; i < results.length; i++) {
//                             var id = results[i].id;
//                             var name = results[i].product_name;
//                             prodsArray.push(id, name);
//                         }
//                         return prodsArray;
//                     },
//                     message: "Please select the item that you are shopping for"
//                 }
//             ])
//             .then(function(answer){
//                 var custNeed = answer.product-choice;
//                 getQuantity(custNeed)
//                 // ask how many they would like.

//             })
//     })
// }

// function getQuantity(something){
//     if(anwer.quantity === something){

//     }
// }
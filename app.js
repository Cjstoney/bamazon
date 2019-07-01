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

var makeTable = function () {
    connection.query("SELECT * FROM products", function (err, response) {

        // for (var i = 0; i < response.length; i++) {

        //     console.log("We carry: " + "\n" + response[i].id + " || " + response[i].product_name + " || " + response[i].
        //         department_name + " || " + response[i].price + " || " + response[i].stock_quantity + "\n");
        // }


        console.table(response, ["id", "product_name", "price"])

        inquirer.prompt({
            name: "toPurchase",
            type: "input",
            message: "Please enter the id of the product you would like to purchase?"
        }).then(function (answer) {
            // console.log(answer.toPurchase)
            var isPoss = false
            for (var i = 0; i < response.length; i++) {
                // console.log(response)
                if (response[i].id === parseInt(answer.toPurchase)) {
                    isPoss = true;
                    var wantedProduct = response[i];
                    var key = [i];
                    console.log("A "+wantedProduct.product_name+" is $"+wantedProduct.price);
                    inquirer
                        .prompt({
                            name: "inventory",
                            type: "input",
                            message: "How many would you like to purchase?"
                        }).then(function (answer) {
                            var gotEnough = false
                            var intAnsInventory = parseInt(answer.inventory);
                            console.log(wantedProduct.stock_quantity);
                            if (intAnsInventory <= wantedProduct.stock_quantity) {
                                gotEnough = true
                                var newQuant = wantedProduct.stock_quantity - intAnsInventory;
                                var total = intAnsInventory* wantedProduct.price
                                connection.query("UPDATE products SET ? WHERE?",
                                [{
                                    stock_quantity: newQuant
                                },
                                {
                                    id: key
                                }],
                                function (err, response) {
                                    if (err) throw err;
                                    console.log("Great, we will send " + intAnsInventory + " of the "+wantedProduct.product_name+ " your way! Your total will be $"+total);
                                    process.exit();
                                    })
                            }
                            if(gotEnough === false){
                                wantTooMany();
                            }
                        });
                }

                
            }
                // wrong answer function here?
                if(isPoss === false){
                    wrongAnswer();
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

function wrongAnswer(){
    console.log("I am sorry, that is not something we carry");
    inquirer.prompt({
        name: "continue",
        type: "input",
        message: "Would you like to continue?",
        choices: ["YES", "NO"]
    }).then(function (answer) {
        if (answer.continue.toUpperCase() === "YES") {
            makeTable();
        } else {
            process.exit();
        }
    })
}

function wantTooMany(){
    console.log("I am sorry, that is more than we carry");
    inquirer.prompt({
        name: "continue",
        type: "input",
        message: "Would you like to continue?",
        choices: ["YES", "NO"]
    }).then(function (answer) {
        if (answer.continue.toUpperCase() === "YES") {
            makeTable();
        } else {
            process.exit();
        }
    })
}
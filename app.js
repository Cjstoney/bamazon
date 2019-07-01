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
                if (response[i].id === answer.choice) {
                    isPoss = true;
                    var key = i;
                    console.log(key);
                    inquirer
                        .prompt({
                            name: "inventory",
                            type: "input",
                            message: "How many would you like to purchase?"
                        }).then(function (answer) {
                            if (inventory.answer < stock_quantity - inventoy.answer) {
                                var newQuant = stock_quantity - inventory.answer;
                                console.log("Great, we will send " + inventory.answer + " your way!");
                                connection.query("UPDATE products SET ? WHERE?",
                                    [{
                                        stock_quantity: newQuant
                                    },
                                    {
                                        id: key
                                    }],
                                    function (err, response) {
                                        if (err) throw err;
                                        console.log(res.affectedRows + " products updated! \n");
                                    })
                            }
                        })
                } 
                

            }
            console.log("I am sorry, that is not something we carry");
            inquirer.prompt({
                name: "continue",
                type: "input",
                message: "Would you like to continue?",
                choices: ["YES", "NO"]
            }).then(function(answer){
                if(answer.continue.toUpperCase()==="YES"){
                    makeTable();
                }else{
                    process.exit();
                }
            })
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

function checkAvailability() {
    
}
// function getQuantity(something){
//     if(anwer.quantity === something){

//     }
// }
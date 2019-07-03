# Bamazon

#### Application Use
*Bamazon* is a node based application to replicate a customer transaction in a store. In the terminal, run 
`node app.js` to start the program.
[Customer is greeted](images/customer_greeting.png)

*Bamazon* will display a product table for the customer to view the items for sale.
[Customer is shown the product table](images/product_table.png)

 *Bamazon* will prompt the customer to selct a product, using the product's **id** and select the quantity of items the customer would like. 


 Once the customers have selected the items and quantity, *Bamazon* will check to see if the invetory is in stock. 
 [Customer prompted for quantity](images/quantity.png)

 
 If the quantity selected is in stock, *Bamazon* will calculate the total price of the order and update the inventory amount. Then it will exit the user out of the program. 
 [Total of the customer's order is displayed](images/total.png)


 #### Technologies Used
- node.js
- npm inquirer
- mysql
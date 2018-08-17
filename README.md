# 10_StoreFrontHW

Description

This application implements a simple command line based storefront using the npm inquirer and sql packages. The customer interface allows
the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. 
The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity 
is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired
quantity is not available, the user is prompted to modify their order.

To run the customer interface please follow the steps below:


1.) clone from https://github.com/VladKondrachuk/10_StoreFrontHW.git
2.) Please install node on your machine if you do not have it.
3.) Install the following packages
        npm init
        npm install mysql
        npm install inquirer
4.) Run storefront.js in your command line.

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "marketplace_db"
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log("Connected as id :" + connection.threadId);
});


function validateInput(value){
  let integer = Number.isInteger(parseFloat(value));
  let sign = Math.sign(value);

  if(integer && (sign===1)){
    return true;
  }else{
    return 'Please enter whole number';
  }
}

function promptUserPurchase() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the item ID which you would like to buy.',
            validate:validateInput,
            filter: Number
        },

        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?',
            validate:validateInput,
            filter: Number
        }
    ]).then(function(input){
      console.log("Problem Here")
      let item = input.item_id;
      let quantity = input.stock_quantity;

      let queryString = 'SELECT * FROM products WHERE ?';

      connection.query(queryString, {item_id: item}, function(err,data){
        if(err) throw err;

        if(data.length===0){
          console.log("Item not found, please select another item")
          displayInventory();
        }else{

          let productData = data[0];

          if(quantity <=productData.stock_quantity){
            console.log("The item is in stock please place an order!");

            let updateQueryString = 'UPDATE products SET stock_quantity ' + (productData.stock_quantity - quantity)

            connection.query(updateQueryString, function(err,data){
              if(err) throw err;

              console.log("Your order has been placed! Your total is $" + productData.price * quantity)
              console.log("--------------------------------------------------------------")
              connection.end();
            })
          }else{
            console.log("Sorry there is not enough product in stock")
            console.log("Please make another selection")

            displayInventory();
          }
        }
      })
    })
}

function displayInventory(){

  queryString = 'SELECT * FROM products';

  connection.query(queryString, function(err,data){
    if(err) throw err;

    console.log("Inventory List")
    console.log("--------------------------------------------------------------")


    let initialDisplay = '';
    for (let i =0; i<data.length; i++){

      initialDisplay = '';
      initialDisplay += 'Item ID: ' + data[i].item_id + '   //   '
      initialDisplay += 'Product Name: ' + data[i].product_name + '   //   '
      initialDisplay += 'Department Name: ' + data[i].department_name + '   //   '
      initialDisplay += 'Price $: ' + data[i].price + '   //   '

      console.log(initialDisplay)
    }

    console.log("--------------------------------------------------------------")

    promptUserPurchase();

  })
}

function runStore(){
  displayInventory();
}

runStore();
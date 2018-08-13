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
  //Its WORKING!!!! FINALLY!!!
  console.log("Connected as id :" + connection.threadId);
});
//validate user input to make sure that the user is not putting in decimals
function validateInput(value){
  let integer = Number.isInteger(parseFloat(value));
  let sign = Math.sign(value);

  if(integer && (sign===1)){
    return true;
  }else{
    return 'Please enter whole number';
  }
}
//Main function
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
      
      let item = input.item_id;
      let quantity = input.quantity;

      let queryString = 'SELECT * FROM products WHERE ?';
      
      connection.query(queryString, {item_id:item}, function(err,data){
        if(err) throw err;
        console.log("Connection Made")
        if(data.length===0){
          console.log("Item not found, please select another item")
          displayInventory();
        }else{

          let productData = data[0];
          console.log("Connection made to query function")
          console.log('product Data ' + productData.stock_quantity)
          console.log('quantity ' + quantity)
          //item id will not be defined bc its only in SQL console.log('item_id' + item_id)
          console.log('item ' + item)
          
          if(quantity<=productData.stock_quantity){
            console.log("The item is in stock please place an order!");

            let updateQueryString = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
            console.log("Connection made to update the stock quantity on the server")
            connection.query(updateQueryString, function(err, data){
              if(err) throw err;

              console.log("Your order has been placed! Your total is $" + productData.price * quantity)
              console.log("--------------------------------------------------------------")


              inquirer
.prompt({
  name: "BuyAnother",
  type: "rawlist",
  message: "Would you like to buy something else?",
  choices: ["Y", "N"]
}).then(function(answer) {
  // based on their answer, either call the bid or the post functions
  if (answer.BuyAnother.toUpperCase() === "Y") {
    promptUserPurchase();
  }
  else {
    connection.end();
  }
});







              
              
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
      initialDisplay += 'Item ID: ' + data[i].item_id + ' // '
      initialDisplay += 'Product Name: ' + data[i].product_name + ' // '
      initialDisplay += 'Department Name: ' + data[i].department_name + ' // '
      initialDisplay += 'Price $: ' + data[i].price + '   //   '
      initialDisplay += 'Amount in Stock : ' + data[i].stock_quantity + ' // '
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
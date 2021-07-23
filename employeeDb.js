const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",
  password: process.env.DB_PASSWORD,
  // Your password
  database: "employeeDB",
});

// function which prompts the user for what action they should take
const start = () => {
  inquirer
    .prompt({
      name: "mainChoices",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add a department",
        "Add an Employee",
        "Add an Employee Role",
        "View All Employees",
        "View Employees by Department",
        "View Employees by Role",
        "Update Employee Role",
      ],
    })
    .then((answer) => {
      switch (answer.mainChoices) {
        case "Add a department":
          addDept();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Add an Employee Role":
          addRole();
          break;
        case "View All Employees":
          viewAll();
          break;
        case "View Employees by Department":
          viewByDept();
          break;
        case "View Employees by Role":
          viewByRole();
          break;
        case "Update Employee Role":
          updateRole();
          break;
      }
    });
};

function addEmployee(){
  var 
}
const bidAuction = () => {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM items", (err, results) => {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices() {
            const choiceArray = [];
            results.forEach(({ item_name }) => {
              choiceArray.push(item_name);
            });
            return choiceArray;
          },
          message: "What auction would you like to place a bid in?",
        },
        {
          name: "bid",
          type: "input",
          message: "How much would you like to bid?",
        },
      ])
      .then((answer) => {
        // get the information of the chosen item
        let chosenItem;
        results.forEach((item) => {
          if (item.item_name === answer.choice) {
            chosenItem = item;
          }
        });

        connection.query(
          "INSERT INTO bids SET ?, ?",
          [
            {
              item_id: chosenItem.id,
            },
            {
              amount: answer.bid,
            },
          ],
          (err, result) => {
            if (err) throw err;

            //console.log("bid insert result: ", result);
            const newBidId = result.insertId;
            console.log("Bid placed successfully!");

            connection.query(
              "SELECT * FROM bids WHERE ? ORDER BY amount DESC LIMIT 1",
              [
                {
                  item_id: chosenItem.id,
                },
              ],
              (err, results) => {
                if (err) throw err;

                //console.log(results);

                if (
                  answer.bid < chosenItem.starting_bid ||
                  (results.length && results[0].id !== newBidId)
                ) {
                  console.log("Your bid was too low. Try again...");
                } else {
                  console.log("You currently have the highest bid!");
                }

                start();
              }
            );
          }
        );
      });
  });
};

// connect to the mysql server and sql database
connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

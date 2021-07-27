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

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department you want to add?",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO department (name) VALUES(?)",
        [res.department],
        function (err, data) {
          if (err) throw err;
          console.table("Department Entered");
          start();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeFirst",
        message: "What is the first name of the employee",
      },
      {
        type: "input",
        name: "employeeLast",
        message: "What is the last name of the employee",
      },
      {
        type: "input",
        name: "employeeRole",
        message: "What is the employee's role ID #?",
      },
      {
        type: "input",
        name: "employeeManager",
        message: "What is the employee's manager's ID #?",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",
        [
          res.employeeFirst,
          res.employeeLast,
          res.employeeRole,
          res.employeeManager,
        ],
        function (err, data) {
          if (err) throw err;
          console.table("Employee Entered");
          start();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeTitle",
        message: "What is the name of the employee's title?",
      },
      {
        type: "input",
        name: "employeeSalary",
        message: "What is the salary amount for the employee at this position?",
      },
      {
        type: "input",
        name: "employeeDep",
        message: "What is the employee's department ID #?",
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES(?,?,?)",
        [res.employeeTitle, res.employeeSalary, res.employeeDep],
        function (err, data) {
          if (err) throw err;
          console.table("Role Entered");
          start();
        }
      );
    });
}
function viewAll() {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    start();
  });
}

function viewByDept() {
  connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    start();
  });
}

function viewByRole() {
  connection.query("SELECT * FROM role", function (err, data) {
    console.table(data);
    start();
  });
}

function updateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "updateEmployee",
        message: "What is the first name of the employee you want to update?",
      },
      {
        type: "input",
        name: "updateRole",
        message: "What is the employee's updated role?",
      },
    ])
    .then((res) => {
      connection.query(
        "UPDATE role SET (title) WHERE (first_name) VALUES(?,?)",
        [res.updateRole, res.updateEmployee],
        function (err, data) {
          if (err) throw err;
          console.table("Role updated for" + " res.first_name");
          start();
        }
      );
    });
}

start();

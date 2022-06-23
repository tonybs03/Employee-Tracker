const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");
const figlet = require('figlet');
const { viewallDepts, viewallRoles, viewallEmps } = require("./scripts/view.js");
const { addDept, addRole, addEmp, updateEmpRole } = require("./scripts/add_update.js");


const con = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '030303',
    database: 'employee_tracker',
  },
  console.log(`Connecting to the employee_tracker database.`)
);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  INIT();
});

const INIT = function () {
  figlet.text('Employee Tracker', {
    width:90
  }, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    MAIN();
  });
}

async function MAIN() {
  userinput = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "Please select one of the following actions.",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role"
    ],
  })
  switch (userinput.action) {
    case "View All Departments":
      viewallDepts(con, MAIN);
      break;
    case "View All Roles":
      viewallRoles(con, MAIN);
      break;
    case "View All Employees":
      viewallEmps(con, MAIN);
      break;
    case "Add a Department":
      addDept(con, MAIN);
      break;            
    case "Add a Role":
      addRole(con, MAIN);
      break;
    case "Add an Employee":
      addEmp(con, MAIN);
      break; 
    case "Update an Employee Role":
      updateEmpRole(con, MAIN);
      break;   
    }
}

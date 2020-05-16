const { prompt } = require('inquirer')
const db = require('./db')
const logo = require('asciiart-logo')
const table = require('console.table')

start();

function start() {
    const Fancy = logo({name: "Employee Manager!"}).render();
    console.log(Fancy);
    console.log("Welcome to Employee Manager!")
    mainPrompt();
}

async function mainPrompt() {
    const { PromptChoices } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {name: "View all current employees.", value: "ViewEM"},
                {name: "View all current employees by department.", value: "ViewEmByDep"},
                {name: "View All current Employees By Manager.", value: "ViewEmByMan"},
                {name: "Add a new Employee.", value: "AddEm"},
                {name: "Remove an Employee.", value: "RemoveEm"},
                {name: "Update an Employees Role.", value: "UpdateEmRole"},
                {name: "Update an Employees Manager.", value: "UpdateEmMan"},
                {name: "View All current Roles.", value: "ViewAllRoles"},
                {name: "Add a new Role.", value: "AddNewRole"},
                {name: "Remove a Role.", value: "RemoveRole"},
                {name: "View All Departments.", value: "ViewDep"},
                {name: "Add a new Department.", value: "AddDep"},
                {name: "Remove a Department.", value: "RemoveDep"},
                {name: "Quit Employee Manager.", value: "QUIT"}
            ]
        }
    ])

    switch (PromptChoices) {
        case "ViewEm":
          return viewEmployees();
        case "ViewEmByDep":
          return viewEmployeesByDepartment();
        case "ViewEmByMan":
          return viewEmployeesByManager();
        case "AddEm":
          return addEmployee();
        case "RemoveEm":
          return removeEmployee();
        case "UpdateEmRole":
          return updateEmployeeRole();
        case "UpdateEmMan":
          return updateEmployeeManager();
        case "ViewDep":
          return viewDepartments();
        case "AddDep":
          return addDepartment();
        case "RemoveDep":
          return removeDepartment();
        case "ViewAllRoles":
          return viewRoles();
        case "AddNewRole":
          return addRole();
        case "RemoveRole":
          return removeRole();
        default:
          return quit();
      }
}

async function viewEmployees() {
    const allEmployees = await db.findAllEmployees();
    console.log("\n");
    console.table(allEmployees);
    mainPrompt();
}
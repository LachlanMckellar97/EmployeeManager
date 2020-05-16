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
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {name: "View all current employees.", value: "VIEW_EMPLOYEES"},
                {name: "View all current employees by department.", value: "VIEW_EMPLOYEES_BY_DEPARTMENT"},
                {name: "View All current Employees By Manager.", value: "VIEW_EMPLOYEES_BY_MANAGER"},
                {name: "Add a new Employee.", value: "ADD_EMPLOYEE"},
                {name: "Remove an Employee.", value: "REMOVE_EMPLOYEE"},
                {name: "Update an Employees Role.", value: "UPDATE_EMPLOYEE_ROLE"},
                {name: "Update an Employees Manager.", value: "UPDATE_EMPLOYEE_MANAGER"},
                {name: "View All current Roles.", value: "VIEW_ROLES"},
                {name: "Add a new Role.", value: "ADD_ROLE"},
                {name: "Remove a Role.", value: "REMOVE_ROLE"},
                {name: "View All Departments.", value: "VIEW_DEPARTMENTS"},
                {name: "Add a new Department.", value: "ADD_DEPARTMENT"},
                {name: "Remove a Department.", value: "REMOVE_DEPARTMENT"},
                {name: "Quit Employee Manager.", value: "QUIT"}
            ]
        }
    ]);
    switch (choice) {
        case "VIEW_EMPLOYEES":
          return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
          return viewEmployeesByDepartment();
        case "VIEW_EMPLOYEES_BY_MANAGER":
          return viewEmployeesByManager();
        case "ADD_EMPLOYEE":
          return addEmployee();
        case "REMOVE_EMPLOYEE":
          return removeEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
          return updateEmployeeRole();
        case "UPDATE_EMPLOYEE_MANAGER":
          return updateEmployeeManager();
        case "VIEW_DEPARTMENTS":
          return viewDepartments();
        case "ADD_DEPARTMENT":
          return addDepartment();
        case "REMOVE_DEPARTMENT":
          return removeDepartment();
        case "VIEW_ROLES":
          return viewRoles();
        case "ADD_ROLE":
          return addRole();
        case "REMOVE_ROLE":
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

async function viewEmployeesByDepartment() {
    const allDepartments = await db.findAllDepartments();
    const departmentOptions = allDepartments.map(({id, name}) => ({
        name: name,
        value: id
    }));

    const {departmentId} = await prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to view the employees of?",
            choices: departmentOptions
        }
    ]);
    const employees = await db.findAllEmployeesByDepartment(departmentId);
    console.log("\n");
    console.table(employees);
    mainPrompt();
}

async function viewEmployeesByManager() {
    const allManagers = await db.findAllemployees();
    const managerOptions = allManagers.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const {managerId} = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Who would you like to see the manager of?",
            choices: managerOptions
        }
    ]);
    const employees = await db.findAllEmployeesByManager(managerId);
    console.log("\n");
    if (employees.length === 0) {
        console.log("The selected employee has no reported manager.");
    } else {
        console.log(employees)
    }
    mainPrompt();
}

async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();
  
    const employee = await prompt([
      {
        name: "first_name",
        message: "What is the new employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the new employee's last name?"
      }
    ]);
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt({
      type: "list",
      name: "roleId",
      message: "What is the new employee's role?",
      choices: roleChoices
    });
  
    employee.role_id = roleId;
  
    const managerChoices = employees.map(({id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    managerChoices.unshift({ name: "None", value: null });
  
    const { managerId } = await prompt({
      type: "list",
      name: "managerId",
      message: "Who is the new employee's manager?",
      choices: managerChoices
    });
  
    employee.manager_id = managerId;
  
    await db.createEmployee(employee);
  
    console.log(
      `Successfully added ${employee.first_name} ${employee.last_name} to the system.`
    );
  
    mainPrompt();
}

async function removeEmployee() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee would you like remove?",
        choices: employeeChoices
      }
    ]);
  
    await db.removeEmployee(employeeId);
  
    console.log("Successfully removed employee from the system.");
  
    mainPrompt();
}

async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to assign the selected employee?",
        choices: roleChoices
      }
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
  
    console.log("Updated employee's role");
  
    loadMainPrompts();
  }

function quit() {
    console.log("Goodbye!");
    process.exit();
  }
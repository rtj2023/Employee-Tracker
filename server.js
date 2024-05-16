const inquirer = require("inquirer")
const conn = require("mysql2")

const db = conn.createConnection({
    host: "localhost",
    user: "root",
    password: "Bal#14may2516",
    database: "emptracker_db",
    port: 3306
})
function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES',
                },

                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE',
                },

                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE',
                },

                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES',
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE',
                },

                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS',
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT',
                },


                {
                    name: 'Quit',
                    value: 'QUIT',
                },
            ],
        },
    ]).then((res) => {
        let choice = res.choice;
        // Call the appropriate function depending on what the user chose
        switch (choice) {
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;

            case 'ADD_EMPLOYEE':
                addEmployee();
                break;

            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;

            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;


            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'ADD_ROLE':
                addRole();
                break;

            default:
                quit();
        }
    });

}

function viewDepartments() {
    db.query("select * from department", (err, res) => {
        console.table(res)
        menu()
    })
}
function viewRoles() {
    db.query("select * from role", (err, res) => {
        console.table(res)
        menu()
    })
}
function viewEmployees() {
    db.query("select * from employee", (err, res) => {
        console.table(res)
        menu()
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What's the new department's name"
        }
    ])
        .then(answers => {
            db.query(`insert into department(department_name) values("${answers.department_name}")`, (err, res) => {
                console.table(res)
                menu()
            })
        })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What's the new role's title"
        },
        {
            type: "input",
            name: "salary",
            message: "What's the new role's salary"
        },
        {
            type: "input",
            name: "dp_id",
            message: "What's the department's id that this role belongs to"
        },
    ])
        .then(answers => {
            db.query(`insert into role(title, salary, department_id) values("${answers.title}", ${answers.salary}, ${answers.dp_id})`, (err, res) => {
                console.table(res)
                menu()
            })
        })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "What's the employee's first name"
        },
        {
            type: "input",
            name: "last",
            message: "What's the employee's last name"
        },
        {
            type: "input",
            name: "rl_id",
            message: "What's the employee's role id"
        },
        {
            type: "input",
            name: "mng_id",
            message: "What's their manager's id"
        },
    ])
        .then(answers => {
            db.query(`insert into employee(first, last, role_id, manager_id) values("${answers.first}", "${answers.last}", ${answers.rl_id}, ${answers.mng_id})`, (err, res) => {
                console.table(res)
                menu()
            })
        })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "emp_id",
            message: "What's the employee's id"
        },

        {
            type: "input",
            name: "rl_id",
            message: "What's the employee's new role id"
        },
    ])
        .then(answers => {
            db.query(`update employee set role_id = ${answers.rl_id} where id = ${answers.emp_id}`, (err, res) => {
                console.table(res)
                menu()
            })
        })
}

menu()

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Dependencies
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MYSQL CONNECTION
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
    start();
})

function start() {
    console.clear();
    console.log(colors.green(" ____________________________________ "));
    console.log(colors.green("|                                    |"));
    console.log(colors.green("|    Welcome to Employee Manager     |"));
    console.log(colors.green("|____________________________________|"));
    console.log(colors.green("                                      "));
    inquirer.prompt({
    
        name: "startOption",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All Employeees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Remove Role", "Add New Role", "Update Employee Manager", "Exit"]
    
    }).then(function(answer) { // IF ELSE STATESMENTS TO NAVIGATE THROUGH THE MAIN MENU
        // USER ANSWER IS USED TO MOVE TO NEXT FUNCTION
        console.clear();
        console.log(colors.green("You Selected " + answer.startOption));
        
        // ____________________________________________________________________________
        if (answer.startOption === "View All Employees") { // CALLS showAllEmployees()
            showAllEmployees();
        }

        // ____________________________________________________________________________
        else if (answer.startOption === "View All Employees By Department") { // CALLS showEmployeeByDept() which calls inquirer prompts
            showEmployeeByDept();
        } 
        
        // ____________________________________________________________________________
        else if (answer.startOption === "View All Employeees By Manager") { // DISPLAYS A MESSAGE STATING THAT THE FEATURE HAS NOT BEEN IMPLEMENTED YET
            console.log("The option to " + answer.startOption + " has not been added yet");
            mainOrExit();
        }

        // _____________________________________________________________________________
        else if (answer.startOption === "Add Employee") { // CALLS addEmployee() WHICH ALLOWS USER TO ADD AN EMPLOYEE WITH INQUIRER PROMPTS
            console.log(colors.green(answer.startOption));
            addEmployee();
        }
        
        // _____________________________________________________________________________
        else if (answer.startOption === "Remove Employee") { // CALLS deleteEmployee which sends user to prompts
            deleteEmployee(); 
        }
        
        // _____________________________________________________________________________
        else if (answer.startOption === "Update Employee Role") { // DISPLAYS A MESSAGE STATING THAT THE FEATURE HAS NOT BEEN IMPLEMENTED YET
            updateRole();
        }

        // _____________________________________________________________________________
        else if (answer.startOption === "Add New Role") { // DISPLAYS A MESSAGE STATING THAT THE FEATURE HAS NOT BEEN IMPLEMENTED YET
            addRole();
        }

        // _____________________________________________________________________________
        else if (answer.startOption === "Remove Role") { // DISPLAYS A MESSAGE STATING THAT THE FEATURE HAS NOT BEEN IMPLEMENTED YET
            deleteRole();
        }
        
        else if (answer.startOption === "Update Employee Manager") { // DISPLAYS A MESSAGE STATING THAT THE FEATURE HAS NOT BEEN IMPLEMENTED YET
            console.log("The option to " + answer.startOption + " has not been added yet");
            mainOrExit();
        }
        
        else { // CALLS mainOrExit() WHICH PROMPTS THE USER TO EXIT OF RETURN TO THE MAIN MENU
            mainOrExit();
        }
    });
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SECONDARY FUNCTIONS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function mainOrExit() { // FUNCTION THAT PROMPTS FOR MAIN MENUE OR EXIT
    inquirer.prompt({
        name:"startExit",
        type: "list",
        message: "What would you like to do?",
        choices: ["Main Menu", "Exit"]
    })
    .then(function(answer) {
        if (answer.startExit === "Main Menu") {
            console.clear();
            start();
        } 
        
        else {
            inquirer.prompt({
                name:"sure",
                type: "list",
                message: "Are you sure you want to exit?",
                choices: ["Yes", "No"]
            })
            .then(function (answers) {
                if (answers.sure === "Yes") {
                    console.clear()
                    console.log(colors.green("     _______________"))
                    console.log(colors.green("    |,----------.  | "))
                    console.log(colors.green("    ||           |=| |"))
                    console.log(colors.green("    ||  Goodbye || | |"))
                    console.log(colors.green("    ||       . _o| | | __"))
                    console.log(colors.green("    |`-----------' |/ /~/"))
                    console.log(colors.green("     ~~~~~~~~~~~~~~~ / /"))
                    console.log(colors.green("                     ~~"))
                    console.log(colors.green("Art by Ojoshiro"))
                    setTimeout(clearExit, 3000)
                } else {
                    start();
            }
        });
    }});
}

function clearExit() { // FUNCTION THAT CLEARS THEN EXITS TERMINAL
    connection.end();
    console.clear();
    process.exit();
}

function addEmployee() { // FUNCTION THAT ADDS AN EMPLOYEE TO THE EMPLOYEE TABLE
        console.clear();
    connection.query("SELECT * FROM role", function(err, results) {
        if (err) throw err;
    
    
    inquirer.prompt([
        {
          name: "first",
          type: "input",
          message: "Enter the employee's fist name."
        },
        {
          name: "last",
          type: "input",
          message: "Enter the employee's last name."
        },
        {
          name: "roleTitle",
          type: "list",
          message: "What position does this employee have?",
          choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].title);
              }
              return choiceArray
          }
        }
      ])
      .then(function(answer) {
        
        var roleId;
        for (var i = 0; i< results.length; i++) {
            if (results[i].title === answer.roleTitle) {
                roleId = results[i].id
            }
        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first,
            last_name: answer.last,
            role_id: roleId
          },
          function(err) {
            if (err) throw err;
            console.log("Employee Information is Saved");
            mainOrExit();
          }
        );
      });
  
    })
}

function addRole() {
    console.clear();
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;
    
    
    inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "Enter the title of the role."
        },
        {
            name: "salary",
            type: "input",
            message: "Please enter the annual salary of this position."
        },
        {
          name: "departmentTitle",
          type: "list",
          message: "Select which department the role will be in.",
          choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].name);
              }
              return choiceArray
          }
        }
      ])
      .then(function(answer) {
        
        var departmentId;
        for (var i = 0; i< results.length; i++) {
            if (results[i].name === answer.departmentTitle) {
                departmentId = results[i].id
            }
        }
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: departmentId
          },
          function(err) {
            if (err) throw err;
            console.log("New Role Information is Saved");
            mainOrExit();
          }
        );
      });
  
    })
}

function deleteEmployee() { // FUNCTION THAT DELETES AN EMPLOYEE IN THE EMPLOYEE TABLE (NEED TO ADD THE REST OF THE OPTIONS)
    console.clear();
    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
    
    
    inquirer.prompt([
        {
          name: "search",
          type: "list",
          message: "How do you want to search for the employee to delete?",
          choices: ["By first name", "By last name", "By employee role", "Main Menu"]
        },
      ])
      .then(function searchEmployeeDelete(answer) {
            
        // ____________________________________________________________
        // DELETE BY FIRST NAME

        if (answer.search === "By first name") {
            let key1 = "first_name";
            let key2 = "last_name";
            let key3 = "role_id";
            searchBy(results, key1, key2, key3);
        } 

        // ____________________________________________________________
        // DELETE BY LAST NAME
        
        else if (answer.search === "By last name") {
            let key1 = "last_name";
            let key2 = "first_name";
            let key3 = "role_id";
            searchBy(results, key1, key2, key3);
        }
        
        else if (answer.search === "By employee role") {
            let key1 = "role_id";
            let key2 = "first_name";
            let key3 = "last_name";
            searchBy(results, key1, key2, key3);
        } 
        
        else if (answer.search === "Main Menu") {
            start();
        }

        
      });
  
    }
    )

}

function deleteRole() {
    console.clear();
    connection.query("SELECT * FROM role", function(err, results) {
        if (err) throw err;
    
    inquirer.prompt([
        {
          name: "roleDelete",
          type: "list",
          message: "Which role would you like to delete?",
          choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].title);
          }
          return choiceArray
        }
    },
      ])
      .then(function (answer) {
            connection.query("DELETE FROM role WHERE title = ?", [answer.roleDelete],
            function(err, res) {
            if (err) throw err;
            console.log(answer.roleDelete + " was deleted! \n")
            mainOrExit();  
        })
        });
  
    }
    )

}

function searchBy(results, key1, key2, key3) { // USED TO SELECT EMPLOYEE BY FIRST NAME, LAST NAME, AND ROLL ID
    inquirer.prompt([
        {
            name:"searchBy",
            type: "list",
            message: "Which employee will you select?",
            choices: function(){
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    let employee = (results[i][key1] + "," + results[i][key2] + "," + results[i][key3]);
                  choiceArray.push(employee);
                }
                return choiceArray;
            }
        }
    ])
    .then(function(answer){
          console.log(answer);
                let employeeData = answer.searchBy;
                console.log(employeeData);
                let employeeDataArray = employeeData.split(","); 
                
                if (key1 === "first_name") {
                    connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?", [employeeDataArray[0], employeeDataArray[1]],
                    function(err, res) {
                    if (err) throw err;
                    console.log(employeeDataArray[0] + " " + employeeDataArray[1] + " was deleted! \n")
                    mainOrExit();  
                })
                } 
                else if (key1 === "last_name") {
                    connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?", [employeeDataArray[1], employeeDataArray[0]],
                    function(err, res) {
                    if (err) throw err;
                    console.log(employeeDataArray[1] + " " + employeeDataArray[0] + " was deleted! \n")
                    mainOrExit();  
                })
                } 
                else if (key1 === "role_id") {
                    connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?", [employeeDataArray[1], employeeDataArray[2]],
                    function(err, res) {
                    if (err) throw err;
                    console.log(employeeDataArray[1] + " " +  employeeDataArray[2] + " was deleted! \n")
                    mainOrExit();  
                })
            }
            
        }) 
}

function updateRole(){ // FUNCTION THAT SELECTS AN EMPLOYEE AND UPDATES THEIR ROLE OR "JOB TITLE"
console.clear();
connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
inquirer.prompt([
    {
      name: "search",
      type: "list",
      message: "How do you want to search for the employee to update?",
      choices: ["By first name", "By last name", "By employee role", "Main Menu"]
    },
  ])
  .then(function searchEmployeeDelete(answer) {
        
    // ____________________________________________________________
    // DELETE BY FIRST NAME

    if (answer.search === "By first name") {
        let key1 = "first_name";
        let key2 = "last_name";
        let key3 = "role_id";
        searchByUpdate(results, key1, key2, key3);
    } 

    // ____________________________________________________________
    // DELETE BY LAST NAME
    
    else if (answer.search === "By last name") {
        let key1 = "last_name";
        let key2 = "first_name";
        let key3 = "role_id";
        searchByUpdate(results, key1, key2, key3);
    }
    
    else if (answer.search === "By employee role") {
        let key1 = "role_id";
        let key2 = "first_name";
        let key3 = "last_name";
        searchByUpdate(results, key1, key2, key3);
    } 
    
    else if (answer.search === "Main Menu") {
        start();
    }

    
  });

}
)  
}

function searchByUpdate(results, key1, key2, key3){
    inquirer.prompt([
        {
            name:"searchBy",
            type: "list",
            message: "Which employee will you select?",
            choices: function(){
                let choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    let employee = (results[i][key1] + "," + results[i][key2] + "," + results[i][key3]);
                  choiceArray.push(employee);
                }
                return choiceArray;
            }
        }
    ])
    .then(function(answer){
          console.log(answer);
                let employeeData = answer.searchBy;
                console.log(employeeData);
                let employeeDataArray = employeeData.split(","); 
                connection.query("SELECT * FROM role", function(err, results) {
                    if (err) throw err;
                    inquirer.prompt([
                        {
                            name: "roleChoice",
                            type: "list",
                            message: "Please select the new role for this employee",
                            choices: function() {
                                let choiceArray = [];
                                for (var i = 0; i < results.length; i++) {
                                let role = results[i].title;
                                choiceArray.push(role);
                                }
                                return choiceArray;
                            }
                        },
                    ]).then(function(answer){
                        let roleChoice = answer.roleChoice;
                        connection.query("SELECT id FROM role WHERE role.title = ?", [roleChoice], function(err, results) {
                            if (err) throw err;
                            console.log(results[0].id + " Line 391");
                            roleChoiceId = parseInt(results[0].id);
                            employeeDataArray.push(roleChoiceId);
                            console.log(employeeDataArray + " Line 394");

                            if (key1 === "first_name") {
                                console.log(employeeDataArray + " Line 398");
                                let newRoleId = employeeDataArray[3];
                                console.log(newRoleId + " Line 400");
                                connection.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?", [newRoleId, employeeDataArray[0], employeeDataArray[1]],
                                function(err, res) {
                                if (err) throw err;
                                console.log(employeeDataArray[0] + " " + employeeDataArray[1] + " was updated! \n")
                                mainOrExit();  
                            })
                            } 
                            else if (key1 === "last_name") {
                                connection.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?", [employeeDataArray[3], employeeDataArray[1], employeeDataArray[0]],
                                function(err, res) {
                                if (err) throw err;
                                console.log(employeeDataArray[1] + " " + employeeDataArray[0] + " was updated! \n")
                                mainOrExit();  
                            })
                            } 
                            else if (key1 === "role_id") {
                                connection.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?", [employeeDataArray[3], employeeDataArray[1], employeeDataArray[2]],
                                function(err, res) {
                                if (err) throw err;
                                console.log(employeeDataArray[1] + " " +  employeeDataArray[2] + " was updated! \n")
                                mainOrExit();  
                            })
                        }



                        })


                        
                    
                }) 






                })


    })
                
                
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// FUNCTIONS THAT PULL UP TABLES OF INFORMATION
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function showAllEmployees(){ // FUNCTION THAT DISPLAYS ALL EMPLOYEES IN A TABLE INCLUDING THEIR ROLE AND DEPARTMENT INFO
    console.clear();
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            mainOrExit();
        })
}

function showEmployeeByDept(){
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "dept",
                type: "list",
                message: "Select the department that you want to view the employees of.",
                choices: function () {
                    var choiceArray = [];
                  for (var i = 0; i < results.length; i++) {
                      choiceArray.push(results[i].name);
                  }
                  return choiceArray
                }
            }
        ]).then(function (answer) {
            if (answer.dept === "Sales") {
                salesDept();
            } 
            else if (answer.dept === "Engineering") {
                engineeringDept();
            }
        
            else if (answer.dept === "Legal") {
                legalDept();
            }
        
            else if (answer.dept === "Human Resources") {
                humanResourcesDept();
            }
        
            else if (answer.dept === "Warehouse") {
                warehouseDept();
            }
    
        })

    })
    

    
}

function salesDept() { // FUNCTION THAT DISPLAYS ALL EMPLOYEES FROM THE SALES DEPARTMENT IN A TABLE
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id WHERE name = 'Sales';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            mainOrExit();
        })
}

function engineeringDept() { // FUNCTION THAT DISPLAYS ALL EMPLOYEES FROM THE ENGINEERING DEPARTMENT IN A TABLE
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id WHERE name = 'Engineering';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            mainOrExit();
        })
}

function humanResourcesDept() { // FUNCTION THAT DISPLAYS ALL EMPLOYEES FROM THE HUMAN RESOURCES DEPARTMENT IN A TABLE
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id WHERE name = 'Human Resources';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            mainOrExit();
        })
}

function warehouseDept() { // FUNCTION THAT DISPLAYS ALL EMPLOYEES FROM THE WAREHOUSE DEPARTMENT IN A TABLE
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id WHERE name = 'Warehouse';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            mainOrExit();
        })
}

function legalDept() { // FUNCTION THAT DISPLAYS ALL EMPLOYEES FROM THE LEGAL DEPARTMENT IN A TABLE
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id WHERE name = 'Legal';",
        function (err, res) {
            if (err) throw err
            console.table(res)
            mainOrExit();
        })
}
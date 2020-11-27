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
    console.log(colors.green("____________________________________"));
    console.log(colors.green("Welcome to Employee Manager"));
    console.log(colors.green("____________________________________"));
    console.log(colors.green("                                    "));
    inquirer.prompt({
    
        name: "startOption",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All Employeees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]
    
    }).then(function(answer) {
        // USER ANSWER IS USED TO MOVE TO NEXT FUNCTION
        console.clear();
        console.log(colors.green("You Selected " + answer.startOption));
        // VIEW ALL EMPLOYEES
        if (answer.startOption === "View All Employees") {
            showAllEmployees();
        }


        else if (answer.startOption === "View All Employees By Departement") {
            console.log("This is a placeholder for " + answer.startOption);
            mainOrExit();
        } 
        
        else if (answer.startOption === "View All Employeees By Manager") {
            console.log("This is a placeholder for " + answer.startOption);
            mainOrExit();
        }

        else if (answer.startOption === "Add Employee") {
            console.log(colors.green(answer.startOption));
            addEmployee();
        }
        
        else if (answer.startOption === "Remove Employee") {
            console.log(colors.green(answer.startOption));

            deleteEmployee(); // CALLS deleteEmployee which sends user to prompts
        }
        
        else if (answer.startOption === "Update Employee Role") {
            console.log("This is a placeholder for " + answer.startOption);
            mainOrExit();
        }
        
        else if (answer.startOption === "Update Employee Manager") {
            console.log("This is a placeholder for " + answer.startOption);
            mainOrExit();
        }
        
        else {
            console.clear();
            process.exit();
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
                    console.log(colors.red("Goodbye"))
                    setTimeout(clearExit, 2000)
                } else {
                    start();
            }
        });
    }});
}

function clearExit() { // FUNCTION THAT CLEARS THEN EXITS TERMINAL
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

function deleteEmployee() { // FUNCTION THAT DELETES AN EMPLOYEE IN THE EMPLOYEE TABLE (NEED TO ADD THE REST OF THE OPTIONS)
    console.clear();
    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
    
    
    inquirer.prompt([
        {
          name: "search",
          type: "list",
          message: "How do you want to search for the employee to delete?",
          choices: ["By first name", "By last name", "By employee role", "All Employees", "Main Menu"]
        },
      ])
      .then(function searchEmployeeDelete(answer) {
            
        
        if (answer.search === "By first name") {
            inquirer.prompt([
                {
                    name:"firstSearch",
                    type: "list",
                    message: "Which employee will you select?",
                    choices: function(){
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].first_name);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function(answer){
                let employeeFirst = answer.firstSearch
                connection.query("DELETE FROM employee WHERE ?", 
                {
                    first_name: employeeFirst
                },
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " was deleted! \n")
                
            });
                
        })} 
        // ____________________________________________________________
        // DELETE BY LAST NAME
        
        else if (answer.search === "By last name") {
            inquirer.prompt([
                {
                    name:"lastSearch",
                    type: "list",
                    message: "Which employee will you select?",
                    choices: function(){
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                          choiceArray.push(results[i].last_name);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function(answer){
                let employeeLast = answer.lastSearch
                connection.query("DELETE FROM employee WHERE ?",
                {
                    last_name: employeeLast
                },
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " was deleted! \n")
                
            })
        })}
        
        else if (answer.search === "By employee role") {
            
        } 
        
        else if (answer.search === "All Employees") {
            
        }

        else if (answer.search === "Main Menue") {
            start();
        }

        
      });
  
    }
    )}

function showAllEmployees(){
    console.clear();
    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        let allEmployees = [];
        for (i = 0; i < results.length; i++) {
            let allEmployeeObj = {
            first_name: results[i].first_name,
            last_name: results[i].last_name,
            role_id: results[i].role_id
            }
            allEmployees.push(allEmployeeObj);
        }
        console.table(allEmployees);
        inquirer.prompt([
            {
                name: "menu",
                type: "confirm",
                message: "Press 'enter' to go back to the main menu",
                default: true
            }
        ])
        .then(function(answer){
            if (answer.menu) {
            mainOrExit();
            } else {
                mainOrExit();
            }
        })

});
}

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
        choices: ["View All Employees", "View All Employees By Department", "View All Employeees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Exit"]
    
    }).then(function(answer) {
        // USER ANSWER IS USED TO MOVE TO NEXT FUNCTION
        console.clear();
        console.log(colors.green("You Selected " + answer.startOption));
        // VIEW ALL EMPLOYEES
        if (answer.startOption === "View All Employees") { // CALLS showAllEmployees()
            showAllEmployees();
        }


        else if (answer.startOption === "View All Employees By Departement") {
            console.log("The option to " + answer.startOption + " has not been added yet");
            mainOrExit();
        } 
        
        else if (answer.startOption === "View All Employeees By Manager") {
            console.log("The option to " + answer.startOption + " has not been added yet");
            mainOrExit();
        }

        else if (answer.startOption === "Add Employee") { // CALLS addEmployee()
            console.log(colors.green(answer.startOption));
            addEmployee();
        }
        
        else if (answer.startOption === "Remove Employee") { // CALLS deleteEmployee which sends user to prompts
            deleteEmployee(); 
        }
        
        else if (answer.startOption === "Update Employee Role") {
            console.log("The option to " + answer.startOption + " has not been added yet");
            mainOrExit();
        }
        
        else if (answer.startOption === "Update Employee Manager") {
            console.log("The option to " + answer.startOption + " has not been added yet");
            mainOrExit();
        }
        
        else {
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
          choices: ["By first name", "By last name", "By employee role", "Main Menu"]
        },
      ])
      .then(function searchEmployeeDelete(answer) {
            
        // ____________________________________________________________
        // DELETE BY FIRST NAME

        if (answer.search === "By first name") {
            var key1 = "first_name";
            var key2 = "last_name";
            var key3 = "role_id";
            searchBy(results, key1, key2, key3);
        } 

        // ____________________________________________________________
        // DELETE BY LAST NAME
        
        else if (answer.search === "By last name") {
            var key1 = "last_name";
            var key2 = "first_name";
            var key3 = "role_id";
            searchBy(results, key1, key2, key3);
        }
        
        else if (answer.search === "By employee role") {
            var key1 = "role_id";
            var key2 = "first_name";
            var key3 = "last_name";
            searchBy(results, key1, key2, key3);
        } 
        
        else if (answer.search === "Main Menu") {
            start();
        }

        
      });
  
    }
    )

}

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

function searchBy(results, key1, key2, key3) {
    inquirer.prompt([
        {
            name:"searchBy",
            type: "list",
            message: "Which employee will you select?",
            choices: function(){
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    let employee = (results[i][key1] + ", " + results[i][key2] + ", " + results[i][key3]);
                  choiceArray.push(employee);
                }
                return choiceArray;
            }
        }
    ])
    .then(function(answer){
          console.log(answer);
                let employeeData = answer.searchBy;
                let employeeDataArray = employeeData.split(","); 
                console.log(employeeDataArray[0]);
                connection.query("DELETE FROM employee WHERE ?", 
                {
                    [key1]: employeeDataArray[0]
                },
                function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " was deleted! \n")
                    mainOrExit();  
            });
            
        }) 
}
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
            console.log("This is a placeholder for " + answer.startOption);
            mainOrExit();
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
            console.log("This is a placeholder for " + answer.startOption);
            mainOrExit();
        }
        
        else if (answer.startOption === "Remove Employee") {
            console.log("This is a placeholder for " + answer.startOption);
            mainOrExit();
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
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the item you would like to submit?"
        },
        {
          name: "category",
          type: "input",
          message: "What category would you like to place your auction in?"
        },
        {
          name: "startingBid",
          type: "input",
          message: "What would you like your starting bid to be?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO auctions SET ?",
          {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid || 0,
            highest_bid: answer.startingBid || 0
          },
          function(err) {
            if (err) throw err;
            console.log("Your auction was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }










// // =============================================================
// // Sets up the Express App
// // =============================================================
// var app = express();
// var PORT = process.env.PORT || 3000;


// // Sets up the Express app to handle data parsing
// // =============================================================
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '/public')));
// console.log(__dirname);

// // =============================================================


// // Starts the server to begin listening
// // =============================================================
// app.listen(PORT, function() {
//   console.log("App listening on PORT " + PORT);
// });

// let rawdata = fs.readFile("data/db.json", (err, data) => {
//   if (err) throw err;
//   let db = JSON.parse(data)
//   console.log(db);
// });



// function which prompts the user for what action they should take
// function start() {
//     inquirer
//       .prompt({
//         name: "postOrBid",
//         type: "list",
//         message: "Would you like to [POST] an auction or [BID] on an auction?",
//         choices: ["POST", "BID", "EXIT"]
//       })
//       .then(function(answer) {
//         // based on their answer, either call the bid or the post functions
//         if (answer.postOrBid === "POST") {
//           postAuction();
//         }
//         else if(answer.postOrBid === "BID") {
//           bidAuction();
//         } else{
//           connection.end();
//         }
//       });
//   }
  
//   // function to handle posting new items up for auction
//   function postAuction() {
//     // prompt for info about the item being put up for auction
//     inquirer
//       .prompt([
//         {
//           name: "item",
//           type: "input",
//           message: "What is the item you would like to submit?"
//         },
//         {
//           name: "category",
//           type: "input",
//           message: "What category would you like to place your auction in?"
//         },
//         {
//           name: "startingBid",
//           type: "input",
//           message: "What would you like your starting bid to be?",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function(answer) {
//         // when finished prompting, insert a new item into the db with that info
//         connection.query(
//           "INSERT INTO auctions SET ?",
//           {
//             item_name: answer.item,
//             category: answer.category,
//             starting_bid: answer.startingBid || 0,
//             highest_bid: answer.startingBid || 0
//           },
//           function(err) {
//             if (err) throw err;
//             console.log("Your auction was created successfully!");
//             // re-prompt the user for if they want to bid or post
//             start();
//           }
//         );
//       });
//   }
  
//   function bidAuction() {
//     // query the database for all items being auctioned
//     connection.query("SELECT * FROM auctions", function(err, results) {
//       if (err) throw err;
//       // once you have the items, prompt the user for which they'd like to bid on
//       inquirer
//         .prompt([
//           {
//             name: "choice",
//             type: "rawlist",
//             choices: function() {
//               var choiceArray = [];
//               for (var i = 0; i < results.length; i++) {
//                 choiceArray.push(results[i].item_name);
//               }
//               return choiceArray;
//             },
//             message: "What auction would you like to place a bid in?"
//           },
//           {
//             name: "bid",
//             type: "input",
//             message: "How much would you like to bid?"
//           }
//         ])
//         .then(function(answer) {
//           // get the information of the chosen item
//           var chosenItem;
//           for (var i = 0; i < results.length; i++) {
//             if (results[i].item_name === answer.choice) {
//               chosenItem = results[i];
//             }
//           }
  
//           // determine if bid was high enough
//           if (chosenItem.highest_bid < parseInt(answer.bid)) {
//             // bid was high enough, so update db, let the user know, and start over
//             connection.query(
//               "UPDATE auctions SET ? WHERE ?",
//               [
//                 {
//                   highest_bid: answer.bid
//                 },
//                 {
//                   id: chosenItem.id
//                 }
//               ],
//               function(error) {
//                 if (error) throw err;
//                 console.log("Bid placed successfully!");
//                 start();
//               }
//             );
//           }
//           else {
//             // bid wasn't high enough, so apologize and start over
//             console.log("Your bid was too low. Try again...");
//             start();
//           }
//         });
//     });
//   }
  
const cTable = require('console.table');
const inquirer = require("inquirer");



module.exports = {
    addDept: async function (con, MAIN) {
      userinput = await inquirer.prompt([
        {
          name: "d_name",
          type: "input",
          message: "What is the name of the department that you would like to add?",
        },
      ])
      con.query("INSERT INTO department SET ?",
                {
                  d_name: userinput.d_name,
                });
      console.log("Added Department!");
      MAIN();   
    },

    addRole: async function (con, MAIN) {
      con.query("SELECT * FROM department", 
      async function (err, data) {
        if (err) {
          console.log(err);
        }
        const allDepts = data.map((department) => department.d_name);
        userinput = await inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What role would like to add?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary?",
          },
          {
            name: "d_name",
            type: "list",
            message: "What department does it belong to?",
            choices: allDepts
          }
        ]);
        const selectedDept = data.find((department) => department.d_name === userinput.d_name);
        con.query("INSERT INTO workrole SET ?",
                  {
                    title: userinput.title,
                    salary: userinput.salary,
                    d_id: selectedDept.id
                  });
        console.log("Added Role!");
        MAIN();  
      });
    },

    addEmp: async function (con, MAIN) {
      con.query("SELECT * FROM workrole", async function (err, roleData) {
        if (err) {
          console.log(err);
        }
      con.query("SELECT * FROM employee", async function (err, empData) {
        if (err) {
          console.log(err);
        }
        const allRoles = roleData.map((workrole) => workrole.title);
        const allEmps= empData.map((employee) => employee.first_name + " " + employee.last_name);
        // console.log(allRoles);
        // console.log(allEmps);
        userinput = await inquirer.prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is the first name of the new employee?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is the last name of the new employee?",
          },
          {
            name: "role",
            type: "list",
            message: "What role is assgined to the new employee?",
            choices: allRoles,
          },
          {
            name: "mng",
            type: "list",
            message: "Who is assgined to the new employee as the manager?",
            choices: allEmps,
          }
        ]);
        const selectedRole = roleData.find((workrole) => workrole.title === userinput.role);
        const selectedMng = empData.find((employee) => employee.first_name + " " + employee.last_name === userinput.mng);
        con.query("INSERT INTO employee SET ?",
                  {
                    first_name: userinput.first_name,
                    last_name: userinput.last_name,
                    role_id: selectedRole.id,
                    manager_id: selectedMng.id
                  });
        console.log("Added Employee!");
        MAIN(); 
      })});
  },

  updateEmpRole: async function (con, MAIN) {
    con.query("SELECT * FROM workrole", async function (err, roleData) {
      if (err) {
        console.log(err);
      }
    con.query("SELECT * FROM employee", async function (err, empData) {
      if (err) {
        console.log(err);
      }
      const allRoles = roleData.map((workrole) => workrole.title);
      const allEmps= empData.map((employee) => employee.first_name + " " + employee.last_name);

      userinput = await inquirer.prompt([
        {
          name: "emp",
          type: "list",
          message: "Which employee would you like to update?",
          choices: allEmps,
        },
        {
          name: "role",
          type: "list",
          message: "Which new role would you like to assign?",
          choices: allRoles,
        },
      ]);
      const selectedRole = roleData.find((workrole) => workrole.title === userinput.role);
      const selectedEmp = empData.find((employee) => employee.first_name + " " + employee.last_name === userinput.emp);
      con.query("UPDATE employee SET role_id = ? WHERE id = ?", [selectedRole.id, selectedEmp.id],
        function (err) {
          if (err) {
            console.log(err);
          }
          console.log("Updated Employee Role!");
          MAIN();
        }
      );
    })});
  }
}
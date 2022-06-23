const cTable = require('console.table');

module.exports = {
    viewallDepts: function (con, MAIN) {
      con.query("SELECT id, d_name AS Departments FROM department;",
      function (err, data) {
        if (err) {
            console.log(err);
        }
        console.table(data)
        MAIN();
      });
    },

    viewallRoles: function (con, MAIN) {
      con.query("SELECT w.id, w.title AS role, w.salary, d.d_name AS department FROM workrole w JOIN department d ON d.id = w.d_id;",
      function (err, data) {
        if (err) {
            console.log(err);
        }
        console.table(data)
        MAIN();
      });
    }, 
    
    viewallEmps: function (con, MAIN) {
      con.query(`SELECT e.id AS ID, e.first_name, e.last_name, w.title AS role, d.d_name, w.salary, 
                 CONCAT (m.first_name, " ", m.last_name) as manager FROM employee e
                 LEFT JOIN workrole w ON w.id = e.role_id
                 LEFT JOIN department d ON d.id = w.d_id
                 LEFT JOIN employee m ON m.id = e.manager_id
                `,
      function (err, data) {
        if (err) {
            console.log(err);
        }
        console.table(data)
        MAIN();
      });
    }
}

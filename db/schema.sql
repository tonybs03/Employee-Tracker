DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  id INT NOT NULL auto_increment PRIMARY KEY,
  d_name VARCHAR(30)
);

CREATE TABLE workrole (
  id INT NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL(9, 2),
  d_id INT, 
  FOREIGN KEY (d_id) 
  REFERENCES department(id) 
  ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT NOT NULL auto_increment PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT, FOREIGN KEY (role_id) REFERENCES workrole(id) ON DELETE CASCADE,
  manager_id INT, FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

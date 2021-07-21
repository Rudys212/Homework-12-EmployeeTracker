DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT PRIMARY KEY
  name VARCHAR (30)
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT PRIMARY KEY,
 title VARCHAR(30) IS NULL,
  salary DECIMAL(2,5) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT PRIMARY KEY,
 first_name VARCHAR(30) IS NULL,
  last_name VARCHAR(30) IS NULL,
  role_id INT IS NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);


SELECT * FROM top5000;
select * from top_albums;

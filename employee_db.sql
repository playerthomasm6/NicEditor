DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE department;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Human Resources');
INSERT INTO department (name) VALUES ('Legal');
INSERT INTO department (name) VALUES ('Warehouse');

drop table role;
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary INT,
    department_id INT,
    PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id) VALUES ('Engineer I', 75000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Engineer II', 85000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Engineer III', 105000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 145000, 1);

INSERT INTO role (title, salary, department_id) VALUES ('Salesman I', 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Salesman II', 55000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Salesman III', 60000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', 75000, 2);

INSERT INTO role (title, salary, department_id) VALUES ('HR Representative', 85000, 3);

INSERT INTO role (title, salary, department_id) VALUES ('Para-Legal', 85000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Attorney', 120000, 4);

INSERT INTO role (title, salary, department_id) VALUES ('Labor I', 45000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('Labor II', 50000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('Labor III', 55000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('Foreman', 65000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('Supervisor', 75000, 5);

DELETE FROM employee WHERE first_name = 'Dwight';

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    PRIMARY KEY (id)
);
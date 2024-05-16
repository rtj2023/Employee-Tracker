INSERT INTO department (department_name)
VALUES ("HR"),
       ("Legal"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Person", 100000, 1),
       ("Lawyer", 200000, 2),
       ("CFO", 300000, 3);

INSERT INTO employee (first, last, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
       ("Jane", "Doe", 1, null),
       ("GI", "Joe", 1, null);

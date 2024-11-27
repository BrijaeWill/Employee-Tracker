-- Prepopulate departments
INSERT INTO department (name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

-- Prepopulate roles
INSERT INTO role (title, salary, department_id)
VALUES
    ('Software Engineer', 85000, 1),
    ('Accountant', 60000, 2),
    ('Sales Lead', 95000, 4),
    ('Account Manager', 100000, 2),
    ('Salesperson', 85000, 4),
    ('Lead Engineer', 120000, 1),
    ('Lawyer', 190000, 3),
    ('Legal Team Lead', 250000, 3);

-- Prepopulate employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Becky', 'Johnson', 5, 3),
    ('Teresa', 'Owens', 3, NULL),
    ('Carol', 'Blidge', 7, 5),
    ('Cathy', 'Lewis', 8, NULL),
    ('Bob', 'Fawn', 2, 7),
    ('David', 'Lewis', 4, NULL),
    ('Greg', 'Pop', 5, NULL);

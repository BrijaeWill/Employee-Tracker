
\c employee_data;

-- Create department table
CREATE TABLE IF NOT EXISTS department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create role table
CREATE TABLE IF NOT EXISTS job_role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    department_id INT REFERENCES department(id)
);

-- Create employee table
CREATE TABLE IF NOT EXISTS employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT REFERENCES job_role(id),
    manager_id INT REFERENCES employee(id)
);

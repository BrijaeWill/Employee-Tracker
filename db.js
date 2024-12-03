import dotenv from 'dotenv';
import pkg from 'pg';  // Use default import for CommonJS modules
import fs from 'fs';
import path from 'path';
const { Pool } = pkg; // Extract Pool from the default export

dotenv.config();

class EmployeeDatabase {
    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: 5432,
        });
        
        
    }
    async runSeedFile() {
        const seedFilePath = path.join(__dirname, 'seeds.sql');
        const seedSQL = fs.readFileSync(seedFilePath, 'utf8'); 

        try {
            
            await this.pool.query(seedSQL);
            console.log("Database seeded successfully");
        } catch (error) {
            console.error("Error executing seed file:", error);
        }
    }
    //fetch all departments
    async getAlldepartments(){
        const query = 'SELECT * FROM department';
        const result = await this.pool.query(query);
        return result.rows;
    }
    //add new department
    async addDepartment(name){
        const query = 'INSERT INTO department (name) VALUES($1)RETURNING*';
        const values = [name];
        const result = await this.pool.query(query,values);
        return result.rows[0];
    }
    //get all roles
    async getAllRoles(){
        const query =`SELECT job_role.id,job_role.title,job_role.salary, department.name AS department
        FROM job_role
        INNER JOIN department ON job_role.department_id = department.id`;
        const result = await this.pool.query(query);
        return result.rows;
    }
    // add a new role
    async addRole(title, salary,department_id){
        const query =`
      INSERT INTO job_role (title, salary, department_id)
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [title, salary, department_id];
    const result = await this.pool.query(query, values);
    return result.rows[0];
    }
    // get employees
    async getAllEmployees() {
        const query = `
          SELECT employee.id, employee.first_name, employee.last_name, 
                 job_role.title AS job_role, department.name AS department, 
                 CONCAT(manager.first_name, ' ', manager.last_name) AS manager
          FROM employee
          LEFT JOIN job_role ON employee.role_id = job_role.id
          LEFT JOIN department ON job_role.department_id = department.id
          LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
        const result = await this.pool.query(query);
        return result.rows;
      }
      // Add a new employee
  async addEmployee(firstName, lastName, roleId, managerId = null) {
    const query = `
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [firstName, lastName, roleId, managerId];
    const result = await this.pool.query(query, values);
    return result.rows[0];
    

  }
      async editEmployee(employeeId, field, newValue){
        const validFields= ['first_name','last_name','role_id','manager_id'];
        if (!validFields.includes(field)) {
            throw new Error('Invalid field name');
        }
        const query = `UPDATE employee SET ${field} = $1 WHERE id = $2 RETURNING *`;
        const values = [newValue,employeeId];
         try{
      const result = await this.pool.query(query,values);
      if (result.rows.length === 0){
        console.log('Employee not found');
        return null;
      }
      const updatedEmployee = result.rows[0];
      console.log('Employee updated:', updatedEmployee);
      return updatedEmployee;

    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  }
    closeConnection() {
        return this.pool.end();
    }
}

export default EmployeeDatabase;

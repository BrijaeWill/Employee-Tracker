import dotenv from 'dotenv';
import pkg from 'pg';  // Use default import for CommonJS modules
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
    
    closeConnection() {
        return this.pool.end();
    }
}

export default EmployeeDatabase;

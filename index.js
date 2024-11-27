import EmployeeDatabase from './db.js'; 

async function run() {
  const db = new EmployeeDatabase();
  await db.testConnection();
  db.closeConnection(); // Close the connection after testing
}

run();

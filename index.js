import EmployeeDatabase from './db.js'; 
import inquirer from 'inquirer';

async function showMainMenu(db) {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'Add Department',
      'View All Roles',
      'Add Role',
      'View All Employees',
      'Add Employee',
      'Edit Employee',
      'Exit'
    ]
  });
  switch (answer.action) {
    case 'View All Departments':
      await getDepartments(db);
      break;
    case 'Add Department':
      await addDepartment(db);
      break;
    case 'View All Roles':
      await getRoles(db);
      break;
    case 'Add Role':
      await addRole(db);
      break;
    case 'View All Employees':
      await getEmployees(db);
      break;
    case 'Add Employee':
      await addEmployee(db);
      break;
      case 'Edit Employee':
        await updateEmployee(db);
        break;
    case 'Exit':
      await db.closeConnection();  // Close the database connection before exiting
      console.log('Goodbye!');
      return;
  }
  showMainMenu(db);
}
// get all departments
async function getDepartments(db) {
  const departments = await db.getAlldepartments();
  console.log(departments);
}

// Add a new department
async function addDepartment(db) {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the new department:'
  });
  const department = await db.addDepartment(answer.name);
  console.log('Department added:', department);
}
// get all roles
async function getRoles(db) {
  const roles = await db.getAllRoles();
  console.log(roles);
}

// Add a new role
async function addRole(db) {
  const roles = await db.getAlldepartments();  
  const departmentChoices = roles.map(department => ({ name: department.name, value: department.id }));

  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departmentChoices
    }
  ]);

  const role = await db.addRole(answer.title, answer.salary, answer.department_id);
  console.log('Role added:', role);
}
// get all employees
async function getEmployees(db) {
  const employees = await db.getAllEmployees();
  console.log(employees);
}
// Add a new employee
async function addEmployee(db) {
  const roles = await db.getAllRoles();  // Get roles to assign to employees
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

  const employees = await db.getAllEmployees();  // Get employees for manager options
  const managerChoices = employees.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id
  }));
  managerChoices.push({ name: 'None', value: null });

  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the employee\'s first name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the employee\'s last name:'
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the employee\'s role:',
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select the employee\'s manager:',
      choices: managerChoices
    }
  ]);

  const employee = await db.addEmployee(answer.firstName, answer.lastName, answer.roleId, answer.managerId);
  console.log('Employee added:', employee);
}
 
  async function updateEmployee(db){
    const employees = await db.getAllEmployees();
    const employeeChoices = employees.map(employee =>({
    name:`${employee.first_name}${employee.last_name}`,
    value: employee.id

    }));
    const answer = await inquirer.prompt([
      {
        type: 'list',
      name: 'employeeId',
      message: 'Select the employee to update:',
      choices: employeeChoices
      },
      {
        type: 'list',
        name: 'field',
        message: 'Which field would you like to update?',
        choices: ['first_name', 'last_name', 'role_id', 'manager_id']
      },
      {
        type: 'input',
      name: 'newValue',
      message: 'Enter the new value:'
      }
    ]);
    try {
      const { employeeId, field, newValue } = answer;
      const updatedEmployee = await db.editEmployee(employeeId, field, newValue);
      if (updatedEmployee) {
        console.log('Employee updated:', updatedEmployee);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
async function run() {
  const db = new EmployeeDatabase();
  await showMainMenu(db);  // Show the main menu to the user
}

run();


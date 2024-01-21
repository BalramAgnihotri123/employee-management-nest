
# Project Title
EMPLOYEE MANAGEMENT SYSTEM

## Introduction
This project focuses on performing CRUD operations with Authentication and Authorization for a company. It includes connection with RestfulAPIs with scalable nature. 

## Getting Started
Instructions on setting up the project locally.

### Prerequisites
You must have nodeJS installed on your local machine

### Installation
Step-by-step guide on how to get a development environment running.

1. Clone the repo:
   ```
   git clone https://github.com/BalramAgnihotri123/employee-management-nest.git
   ```
2. Change directory:
   ```
   cd employee-management-nest/
   ```
3. Make .env file inside employee-management-nest/:
   ```
    create file named .env according to your system.
   ```

4. Enter the following creds in the .env file/ Configure your environment variables.:
   ```
  MONGODB_URI = "YOUR_MONGODB_URI"
  JWT_EXPIRATION = 864000000 #? 10days
  JWT_SECRET = "L3JP9c6lx/18iw0zkEELSeKN8y+5+qMWAdXkwq+krTs="
   ```

5. Install NPM packages:
   ```
   npm i
   ```

### Running the Application
Explain how to start the application.
```
npm run start:dev
```

## API Documentation
Detailed description of the API endpoints.

### 1. Create Employee
- **Endpoint:** `http://localhost:3000/employees` (POST)
- **Body:**
  ```typescript
  export class EmployeeDto {
      @IsString()
      firstName:string;

      @IsString()
      lastName:string;

      @IsString()
      password:string;

      @IsNumber()
      dateOfBirth:number;

      @IsOptional()
      @IsEnum(EmployeePosition)
      position?:string;

      @IsOptional()
      @IsEnum(EmployeeDepartment)
      department?:EmployeeDepartment;

      @IsOptional()
      @IsBoolean()
      isDeleted:boolean;
  }
  ```
- **Description:** Create a new employee record by providing the necessary details.

### 2. Read Employee
- **Endpoint:** `http://localhost:3000/employees/:employeeId` (GET)
- **Description:** Retrieve details of a specific employee by their ID.

### 3. Update Employee
- **Endpoint:** `/employees/:employeeId` (PUT)
- **Body:**
  ```typescript
  export class updateEmployeeDto {
      // similar structure as EmployeeDto
  }
  ```
- **Description:** Update the details of an existing employee using their ID.

### 4. Delete Employee
- **Endpoint:** `http://localhost:3000/employees/:employeeId` (DELETE)
- **Description:** Delete a specific employee by their ID.

## Code Structure and Design Decisions
Explain how your project is organized and why certain design choices were made.

## Screenshots
1. To create employee give body like: 
```
{
    "firstName":"Balram",
    "lastName":"Agnihotri",
    "password":"abcdef",
    "dateOfBirth":1069612200000,
    "position":"ASSOCIATE",
    "department":"TECH"
}
```
![Screenshot 1](/CreateEmployee.png)

2. To get an employee give the recieved employeeId and accessToken to be used as bearer token in the headers of all the below apis
![Screenshot 2](/GetEmployee.png)

3. To update the employee details with body same as create (also give the JWT access token):
```
{
    "dateOfBirth":1069612200000,
    "position":"ASSOCIATE",
    "department":"TECH"
}
```
![Screenshot 3](/UpdateEmployee.png)

4. To delete an employee(with id and accessToken):
![Screenshot 4](/DeleteEmployee.png)
<!-- 
## Contributing
Information on how others can contribute to your project.

## License
State the license under which your project is available. -->

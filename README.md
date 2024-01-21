
# Project Title
EMPLOYEE MANAGEMENT SYSTEM

## Introduction
- This project focuses on performing CRUD operations with Authentication and Authorization for a company. It includes connection with RestfulAPIs with scalable nature. 

- The codebase contains of AuthModule and EmployeesModule as two major structures. Auth Module takes care of JWT, login, authentication and autherization stuff. The Employees Module takes care of the restApis and the employees collection in the database.

- JWT authentication is applied which incorporates iat, employeeId, and employeeDepartment. Have created JwtGuards and RoleGuards to ensure security of data transfer.

- Pagination is applied with the option of page and limit in the get Employees api

- The validation is done for the input data with the help of class-validator library and nestjs features. It includes optionality of data, type casting, range of data and other important validations 

- To sort the list of employee, sortFields and sortOrder (desc, asc) is also given

- To filter the data, we can use the query params of get employees api:
```
GET http://localhost:3000/employees/?firstName=Balram&lastName=Agnihotri&sortOrder=asc&sortField=dateOfBirth&department=TECH&page=1&limit=10
```

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


4. Enter the following creds in the .env file/ Configure your environment variables:
   ```
    MONGODB_URI="YOUR_MONGODB_URI"

    JWT_EXPIRATION=864000000 # 10 days

    JWT_SECRET="L3JP9c6lx/18iw0zkEELSeKN8y+5+qMWAdXkwq+krTs="
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

### 5. Get Employees
- **Endpoint:** `http://localhost:3000/employees` (GET)
- **Query Parameters:**
```
firstName (Optional): Filter by first name.
lastName (Optional): Filter by last name.
sortOrder (Optional): Sorting order, either "asc" or "desc".
sortField (Optional): Field to sort by.
department (Optional): Filter by department.
page (Optional): Page number.
limit (Optional): Number of items per page.
```
- **Description:** Retrieve a list of employees with optional filters, sorting, and pagination.

``` typescript
import { IsString, IsOptional, IsEnum, IsInt, Min, Max, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetEmployeesDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEnum(EmployeeDepartment)
  @IsOptional()
  department?: EmployeeDepartment;

  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder;

  @IsString()
  @IsOptional()
  @IsIn(['firstName', 'lastName', 'department']) // Add other fields as needed
  sortField?: string;

  @IsInt()
  @Transform(({ value }) => (value !== undefined ? parseInt(String(value), 10) : undefined))
  @Min(1)
  page: number = 1;

  @IsInt()
  @Transform(({ value }) => (value !== undefined ? parseInt(String(value), 10) : undefined))
  @Min(1)
  @Max(100)
  limit: number = 10;
}
```

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

4. To get list of all employees with filteration and validation the getEmployeesDto looks like (Use Jwt access token here as well):
```typescript
export class GetEmployeesDto {
    @IsString()
    @IsOptional()
    firstName?: string;
  
    @IsString()
    @IsOptional()
    lastName?: string;
  
    @IsEnum(EmployeeDepartment)
    @IsOptional()
    department?: EmployeeDepartment;
  
    @IsEnum(EmployeePosition)
    @IsOptional()
    position?: EmployeePosition;

    @IsString()
    @IsOptional()
    @IsIn(['firstName', 'lastName', 'department', 'position', 'dateOfBirth'])
    sortField?: string;
  
    @IsEnum(SortOrder)
    @IsOptional()
    sortOrder?: SortOrder;

    @IsInt()
    @Transform(({ value }) => (value !== undefined ? parseInt(String(value), 10) : undefined))
    @Min(1)
    page: number = 1;
  
    @IsInt()
    @Transform(({ value }) => (value !== undefined ? parseInt(String(value), 10) : undefined))
    @Min(0)
    @Max(100)
    limit: number = 10;
  }
```
![Screenshot 4](/GetEmployees.png)

5. To delete an employee(with id and accessToken):
![Screenshot 4](/DeleteEmployee.png)
<!-- 
## Contributing
Information on how others can contribute to your project.

## License
State the license under which your project is available. -->

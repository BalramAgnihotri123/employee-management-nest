import { IsBoolean, IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { EmployeeDepartment, EmployeePosition } from "../employees.constants";
import { SortOrder } from "src/common/dto";
import { Transform, Type } from "class-transformer";

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

export class updateEmployeeDto {
    @IsOptional()
    @IsString()
    firstName:string;
    
    @IsOptional()
    @IsString()
    lastName:string;
    
    @IsOptional()
    @IsString()
    password:string;

    @IsOptional()
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
    isDeleted:boolean; //* in case of soft delete
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
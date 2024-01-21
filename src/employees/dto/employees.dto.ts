import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EmployeeDepartment, EmployeePosition } from "../employees.constants";

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
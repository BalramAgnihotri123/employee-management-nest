import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";
import { EmployeeDepartment } from "src/employees/employees.constants";

export class AuthDto {
    @IsMongoId()
    employeeId:mongoose.Types.ObjectId

    @IsNotEmpty()
    @IsString()
    password:string;
}

export class JwtDto {
    @IsMongoId()
    @IsNotEmpty()
    sub: mongoose.Types.ObjectId;
  
    @IsEnum(EmployeeDepartment)
    employeeRole?: EmployeeDepartment;

    @IsString()
    @IsNotEmpty()
    iat: number;
  
    @IsString()
    @IsNotEmpty()
    exp: number;
  }
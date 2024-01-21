import { SetMetadata } from "@nestjs/common";
import { EmployeeDepartment } from "src/employees/employees.constants";

export const Roles = (...roles: EmployeeDepartment[]) => SetMetadata('roles', roles)
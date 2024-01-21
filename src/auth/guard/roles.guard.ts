import {
    Injectable,
    CanActivate,
    ExecutionContext,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EmployeeDepartment } from 'src/employees/employees.constants';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
      const requireRoles = this.reflector.getAllAndOverride<
        EmployeeDepartment[]
      >('roles', [context.getHandler(), context.getClass()]);
  
      if (!requireRoles) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const employee = request.user;
  
      return requireRoles.some(
        (role) => employee.department === role,
      );
    }
  }
  
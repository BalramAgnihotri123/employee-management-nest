import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPage } from 'src/common/pages.interface';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Employee, EmployeeDocument } from 'src/employees/employees.schema';

@Injectable()
export class AuthService {
    constructor(
      @InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>,
      private jwt: JwtService,
    ) {};

    async login(authBody:AuthDto):Promise<IPage<any>> {
      const { employeeId, password } = authBody;     
      const employee = await this.employeeModel.findById(employeeId);
      if(!employee) return null;

      const passMatch = await bcrypt.compare(
          password,
          employee.password!,
        );
    
      //If password not matching
      if (!passMatch)
      throw new UnauthorizedException(
          'Invalid credentials',
      );

      const accessToken = await this.signInToken(employee);

      return { accessToken }
    }

    async signInToken(employee:Employee):Promise<string> {
      const token = await this.jwt.signAsync(
          { sub: employee?.id, employeeRole: employee.department },
          {
            expiresIn: process.env.JWT_EXPIRATION,
            secret: process.env.JWT_SECRET,
            algorithm: 'HS512',
          },
        );
      return token
    }
}
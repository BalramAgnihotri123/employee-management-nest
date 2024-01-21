import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Employee, EmployeeSchema } from 'src/employees/employees.schema';

@Module({
  imports:[
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
  ])],  
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}

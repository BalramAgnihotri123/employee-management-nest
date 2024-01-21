import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './employees.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  imports:[
    AuthModule,
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ]
})
export class EmployeesModule {}

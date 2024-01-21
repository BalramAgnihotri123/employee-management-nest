import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './employees.schema';
import mongoose, { Model } from 'mongoose';
import { EmployeeDto, updateEmployeeDto } from './dto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { IPage } from 'src/common/pages.interface';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class EmployeesService {
    constructor(
        private readonly authservice: AuthService,
        @InjectModel(Employee.name)
        private readonly employeeModel: Model<EmployeeDocument>,
    ) {}

    async signUp(employeeDto:EmployeeDto):Promise<IPage<any>> {
        const { password, ...restDto } = employeeDto;
        const encryptedPass = await bcrypt.hash(password, 10)

        const employee = await this.employeeModel.create({
            password:encryptedPass,
            ...restDto
        });

        if(!employee) return null;

        const { password:_, ...restEmployee } = employee['_doc'];

        const accessToken = await this.authservice.signInToken(employee)
        return {
            data:restEmployee,
            accessToken
        }
    }

    async getEmployee(employeeId:mongoose.Types.ObjectId):Promise<IPage<Employee | null>> {
        const employee = await this.employeeModel.findById(new ObjectId(employeeId)).select('-password');
        if(!employee) return null;

        return { data: employee }
    }

    async updateEmployee(employeeId:mongoose.Types.ObjectId, employeeDto:updateEmployeeDto):Promise<IPage<Employee | null>> {
        if (employeeDto.password) throw new Error('Can not update password without verification!')
        const employee = await this.employeeModel.findOneAndUpdate(
            { _id: employeeId },
            { $set: employeeDto },
            { new: true, select: '-password' }
        );
        if(!employee) return null;

        return { data: employee }
    }

    async deleteEmployee(employeeId:mongoose.Types.ObjectId):Promise<IPage<string | null>> {
        const data = await this.employeeModel.findByIdAndDelete(new ObjectId(employeeId));
        if(!data) return null
        return { data: `employee ${data.firstName} successfully deleted!`}
    }
}
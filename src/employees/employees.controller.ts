import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto, GetEmployeesDto, updateEmployeeDto } from './dto';
import mongoose from 'mongoose';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtDto } from 'src/auth/dto';
import { IResponse } from 'src/common/response.interface';
import { IPage } from 'src/common/pages.interface';
import { Employee } from './employees.schema';
import { EmployeeDepartment, EmployeePosition } from './employees.constants';

@Controller('employees')
export class EmployeesController {
    constructor(
        private employeesService: EmployeesService
    ) { };

    @Post()
    async createEmployee(
        @Body() employeeDto:EmployeeDto
    ) {
        try {
            const data = await this.employeesService.signUp(employeeDto);
            
            return {
                data,
                statusCode: HttpStatus.OK,
            };
        } catch (err) {
        throw new HttpException(
            err.message ?? 'Internal Error',
            err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
       }
    }

    @UseGuards(JwtGuard)
    @Get()
    async getAllEmployees(
        @Query() getEmployeesDto: GetEmployeesDto
    )
        : Promise<IResponse<IPage<Employee[]>>> {
        try {
            console.log({getEmployeesDto})
            const data =
                await this.employeesService.getEmployees(getEmployeesDto);

            if(!data?.data?.length) throw new NotFoundException('Employees Not Found!')

            return {
                data,
                statusCode: HttpStatus.OK
            };
        }
        catch (err) {
            throw new HttpException(
                err.message ?? "Internal Error",
                err.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
        }
    };

    @UseGuards(JwtGuard)
    @Get('/:employeeId')
    async getEmployee(
        @GetUser() user: JwtDto,
        @Param('employeeId') employeeId: mongoose.Types.ObjectId,
    ) {
        if (user.sub !== employeeId)
        throw new BadRequestException(
            "employeeId and auth don't match",
        );
        try {
            const data = await this.employeesService.getEmployee(employeeId);
            
            return {
                data,
                statusCode: HttpStatus.OK,
            };
        } catch (err) {
        throw new HttpException(
            err.message ?? 'Internal Error',
            err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
       }
    }

    @UseGuards(JwtGuard)
    @Put('/:employeeId')
    async updateEmployee(
        @GetUser() user: JwtDto,
        @Param('employeeId') employeeId: mongoose.Types.ObjectId,
        @Body() employeeDto:updateEmployeeDto,
    ) {
        if (user.sub !== employeeId)
        throw new BadRequestException(
            "employeeId and auth don't match",
        );
        try {
            const data = await this.employeesService.updateEmployee(employeeId, employeeDto);
            if(!data) throw new BadRequestException(`employee with id ${employeeId} does not exist!`)
            return {
                data,
                statusCode: HttpStatus.OK,
            };
        } catch (err) {
        throw new HttpException(
            err.message ?? 'Internal Error',
            err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
       }
    }

    @UseGuards(JwtGuard)
    @Delete('/:employeeId')
    async deleteEmployee(
        @GetUser() user: JwtDto,
        @Param('employeeId') employeeId: mongoose.Types.ObjectId,
    ) {
        if (user.sub !== employeeId)
        throw new BadRequestException(
            "employeeId and auth don't match",
        );
        try {
            const data = await this.employeesService.deleteEmployee(employeeId);
            
            return {
                data,
                statusCode: HttpStatus.OK,
            };
        } catch (err) {
        throw new HttpException(
            err.message ?? 'Internal Error',
            err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
       }   
    }
}

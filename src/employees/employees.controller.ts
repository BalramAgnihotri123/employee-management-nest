import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeeDto, updateEmployeeDto } from './dto';
import mongoose from 'mongoose';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtDto } from 'src/auth/dto';

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

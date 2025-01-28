import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { Employee } from '../entity/employee.entity';
import { EmployeeService } from '../services/employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() employee: Employee): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() employee: Employee): Promise<Employee> {
    return this.employeeService.update(+id, employee);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.remove(+id);
  }
}
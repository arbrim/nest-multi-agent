import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../entity/employee.entity';
import { EmployeeRepository } from '../repositories/employee.repository';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async create(data: Employee): Promise<Employee> {
    return this.employeeRepository.save(data);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne(id);
  }

  async update(id: number, data: Employee): Promise<Employee> {
    await this.employeeRepository.update(id, data);
    return this.employeeRepository.findOne(id);
  }

  async remove(id: number): Promise<Employee> {
    const employeeToRemove = await this.employeeRepository.findOne(id);
    if (employeeToRemove) {
      return this.employeeRepository.remove(employeeToRemove);
    }
    return null;
  }
}
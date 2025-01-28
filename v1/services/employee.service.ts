// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Employee } from '../entity/employee.entity';
// import { EmployeeRepository } from '../repositories/employee.repository';

// @Injectable()
// export class EmployeeService {
//   constructor(
//     @InjectRepository(Employee)
//     private readonly employeeRepository: EmployeeRepository,
//   ) {}

//   async create(data: Partial<Employee>): Promise<Employee> {
//     return this.employeeRepository.save(data);
//   }

//   async findAll(): Promise<Employee[]> {
//     return this.employeeRepository.find();
//   }

//   async findOne(id: number): Promise<Employee> {
//     return this.employeeRepository.findOne(id);
//   }

//   async update(id: number, data: Partial<Employee>): Promise<Employee> {
//     await this.employeeRepository.update(id, data);
//     return this.employeeRepository.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     await this.employeeRepository.delete(id);
//   }
// }
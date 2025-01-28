import { EntityRepository, Repository } from 'typeorm';
import { Employee } from '../entity/employee.entity';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { Service } from './entities/service.entity';
import { ServiceType } from './types/service.type';

@Injectable()
export class CustomerServiceService {
  constructor(
    @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Attendance) private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async getAllServices(): Promise<ServiceType[]> {
    const services = await this.serviceRepository.find();

    return services.map((service) => {
      const { id, commission, price, time } = service;

      return {
        id,
        commission,
        price,
        time,
      } as ServiceType;
    });
  }
}

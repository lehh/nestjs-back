import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { Service } from './entities/service.entity';
import { AttendanceType } from './types/attendance.type';
import { ServiceType } from './types/service.type';

/**
 * Service which deals with services and attendances
 * Validations omitted for simplicity
 */
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

  async getAllAttendances(): Promise<AttendanceType[]> {
    const attendances = await this.attendanceRepository.find({ relations: ['services'] });

    return attendances.map((attendance) => {
      const { id, finished, duration, services } = attendance;

      return {
        id,
        finished,
        duration,
        services,
      };
    });
  }

  async createAttendance(servicesId: number[]): Promise<AttendanceType> {
    const servicesIds = servicesId.map((id) => {
      return {
        id,
      } as Service;
    });

    const createdAttendance = await this.attendanceRepository.save({ services: servicesIds });
    const attendance = await this.attendanceRepository.findOne(createdAttendance.id, {
      relations: ['services'],
    });

    return {
      id: attendance.id,
      finished: attendance.finished,
      duration: attendance.duration,
      services: attendance.services,
    } as AttendanceType;
  }

  async updateAttendance(attendance: AttendanceType): Promise<AttendanceType> {
    await this.attendanceRepository.update(attendance.id, attendance);

    return attendance;
  }
}

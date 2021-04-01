import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerServiceService } from './customer-service.service';
import { Attendance } from './entities/attendance.entity';
import { Service } from './entities/service.entity';
import { AttendanceType } from './types/attendance.type';
import { ServiceType } from './types/service.type';

const repositoryMock = () => ({
  find: jest.fn(),
  findOne: jest.fn,
  save: jest.fn(),
});

describe('CustomerServiceService', () => {
  let service: CustomerServiceService;
  let serviceRepository: Repository<Service>;
  let attendanceRepository: Repository<Attendance>;

  let serviceObj: Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerServiceService,
        { provide: getRepositoryToken(Service), useFactory: repositoryMock },
        { provide: getRepositoryToken(Attendance), useFactory: repositoryMock },
      ],
    }).compile();

    service = module.get<CustomerServiceService>(CustomerServiceService);
    serviceRepository = module.get(getRepositoryToken(Service));
    attendanceRepository = module.get(getRepositoryToken(Attendance));

    serviceObj = {
      id: 1,
      commission: 10,
      price: 20,
      time: 500,
    } as Service;
  });

  describe('getAllServices', () => {
    it('Should return all services', async () => {
      const expectedResult = [
        {
          id: serviceObj.id,
          commission: serviceObj.commission,
          price: serviceObj.price,
          time: serviceObj.time,
        } as ServiceType,
      ];

      serviceRepository.find = jest.fn().mockResolvedValue([serviceObj]);

      const result = await service.getAllServices();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('createAttendance', () => {
    it('Should create attendance with received services ids', async () => {
      const { id, commission, price, time } = serviceObj;
      const servicesIds = [id];
      const attendance = {
        id: 1,
        duration: null,
        finished: false,
        services: [{ id, commission, time, price } as Service],
      } as Attendance;

      const expectedResult = {
        id: attendance.id,
        finished: attendance.finished,
        duration: attendance.duration,
        services: [{ id, commission, time, price } as ServiceType],
      } as AttendanceType;

      attendanceRepository.save = jest.fn().mockResolvedValue(attendance);
      attendanceRepository.findOne = jest.fn().mockResolvedValue(attendance);

      const result = await service.createAttendance(servicesIds);

      expect(result).toEqual(expectedResult);
    });
  });
});

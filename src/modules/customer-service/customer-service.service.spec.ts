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
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
});

describe('CustomerServiceService', () => {
  let service: CustomerServiceService;
  let serviceRepository: Repository<Service>;
  let attendanceRepository: Repository<Attendance>;

  let serviceObj: Service;
  let attendanceObj: Attendance;

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

    attendanceObj = {
      id: 1,
      duration: 10,
      finished: false,
      services: [serviceObj],
    } as Attendance;
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
      const { id, duration, finished, services } = attendanceObj;
      const servicesIds = [id];

      const expectedResult = {
        id,
        finished,
        duration,
        services,
      } as AttendanceType;

      attendanceRepository.save = jest.fn().mockResolvedValue(attendanceObj);
      attendanceRepository.findOne = jest.fn().mockResolvedValue(attendanceObj);

      const result = await service.createAttendance(servicesIds);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateAttendance', () => {
    it('Should update received attendance', async () => {
      const attendance = {
        finished: true,
        duration: 190,
        id: 1,
      } as AttendanceType;

      attendanceRepository.update = jest.fn().mockResolvedValue(attendance);

      await service.updateAttendance(attendance);

      expect(attendanceRepository.update).toBeCalled();
    });
  });

  describe('getAllAttendances', () => {
    it('Should return all attendances', async () => {
      const { id, finished, services, duration } = attendanceObj;
      const expectedResult = [
        {
          id,
          finished,
          duration,
          services,
        } as AttendanceType,
      ];

      attendanceRepository.find = jest.fn().mockResolvedValue([attendanceObj]);

      const result = await service.getAllAttendances();

      expect(result).toEqual(expectedResult);
    });
  });
});

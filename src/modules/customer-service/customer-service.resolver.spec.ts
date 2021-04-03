import { Test } from '@nestjs/testing';
import { CustomerServiceResolver } from './customer-service.resolver';
import { CustomerServiceService } from './customer-service.service';
import { AttendanceType } from './types/attendance.type';
import { AttendanceInputType } from './types/input-types/attendance.input-type';
import { ServiceType } from './types/service.type';

const customerServiceServiceMock = () => ({
  getAllServices: jest.fn(),
  getAllAttendances: jest.fn(),
  createAttendance: jest.fn(),
  updateAttendance: jest.fn(),
});

describe('CustomerServiceResolver', () => {
  let resolver: CustomerServiceResolver;
  let service: CustomerServiceService;

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        CustomerServiceResolver,
        { provide: CustomerServiceService, useFactory: customerServiceServiceMock },
      ],
    }).compile();

    resolver = testModule.get<CustomerServiceResolver>(CustomerServiceResolver);
    service = testModule.get<CustomerServiceService>(CustomerServiceService);
  });

  describe('getAllServices', () => {
    it('Should return all services', async () => {
      const services = [
        {
          commission: 10,
          price: 20,
          time: 200,
        } as ServiceType,
      ];

      service.getAllServices = jest.fn().mockResolvedValue(services);

      const result = await resolver.getAllServices();

      expect(result).toEqual(services);
    });
  });

  describe('getAllAttendances', () => {
    it('Should return all attendances', async () => {
      const attendances = [
        {
          id: 1,
          finished: false,
          duration: 20,
          services: [{ id: 1, commission: 1, time: 1, price: 1 } as ServiceType],
        } as AttendanceType,
      ];

      service.getAllAttendances = jest.fn().mockResolvedValue(attendances);

      const result = await resolver.getAllAttendances();

      expect(result).toEqual(attendances);
    });
  });

  describe('createAttendance', () => {
    it('Should create attendance and return it', async () => {
      const servicesIds = [1, 2, 3];
      const attendance = {
        id: 1,
        finished: false,
        services: [{ id: 1, commission: 1, time: 1, price: 1 } as ServiceType],
      } as AttendanceType;

      service.createAttendance = jest.fn().mockResolvedValue(attendance);

      const result = await resolver.createAttendance(servicesIds);

      expect(result).toEqual(attendance);
    });
  });

  describe('updateAttendance', () => {
    it('Should update attendance and return it', async () => {
      const attendanceInput = {
        finished: true,
        duration: 190,
        id: 1,
      } as AttendanceInputType;

      const attendance = {
        finished: true,
        duration: 190,
        id: 1,
      } as AttendanceType;

      service.updateAttendance = jest.fn().mockResolvedValue(attendance);

      const result = await resolver.updateAttendance(attendanceInput);

      expect(result).toEqual(attendance);
    });
  });
});

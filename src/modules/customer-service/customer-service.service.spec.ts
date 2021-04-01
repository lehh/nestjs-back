import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerServiceService } from './customer-service.service';
import { Attendance } from './entities/attendance.entity';
import { Service } from './entities/service.entity';
import { ServiceType } from './types/service.type';

const repositoryMock = () => ({
  find: jest.fn(),
});

describe('CustomerServiceService', () => {
  let service: CustomerServiceService;
  let serviceRepository: Repository<Service>;
  let attendanceRepository: Repository<Attendance>;

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
  });

  describe('getAllServices', () => {
    it('Should return all services', async () => {
      const serviceObj = {
        id: 1,
        commission: 10,
        price: 20,
        time: 200,
      } as Service;

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
});

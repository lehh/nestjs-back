import { Test } from '@nestjs/testing';
import { CustomerServiceResolver } from './customer-service.resolver';
import { CustomerServiceService } from './customer-service.service';
import { ServiceType } from './types/service.type';

const customerServiceServiceMock = () => ({
  getAllServices: jest.fn(),
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
});

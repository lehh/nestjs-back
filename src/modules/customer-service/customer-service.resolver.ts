import { Resolver, Query } from '@nestjs/graphql';
import { CustomerServiceService } from './customer-service.service';
import { ServiceType } from './types/service.type';

@Resolver()
export class CustomerServiceResolver {
  constructor(private readonly service: CustomerServiceService) {}

  @Query(() => [ServiceType])
  async getAllServices(): Promise<ServiceType[]> {
    return this.service.getAllServices();
  }
}

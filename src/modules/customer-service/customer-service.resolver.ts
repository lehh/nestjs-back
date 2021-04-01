import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerServiceService } from './customer-service.service';
import { AttendanceType } from './types/attendance.type';
import { ServiceType } from './types/service.type';

@Resolver()
export class CustomerServiceResolver {
  constructor(private readonly service: CustomerServiceService) {}

  @Query(() => [ServiceType])
  async getAllServices(): Promise<ServiceType[]> {
    return this.service.getAllServices();
  }

  @Mutation(() => AttendanceType)
  async createAttendance(@Args('servicesIds', { type: () => [Int] }) servicesIds: number[]) {
    return this.service.createAttendance(servicesIds);
  }
}

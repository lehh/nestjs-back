import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerServiceService } from './customer-service.service';
import { AttendanceType } from './types/attendance.type';
import { AttendanceInputType } from './types/input-types/attendance.input-type';
import { ServiceType } from './types/service.type';

@Resolver()
export class CustomerServiceResolver {
  constructor(private readonly service: CustomerServiceService) {}

  @Query(() => [ServiceType])
  async getAllServices(): Promise<ServiceType[]> {
    return this.service.getAllServices();
  }

  @Mutation(() => AttendanceType)
  async createAttendance(
    @Args('servicesIds', { type: () => [Int] }) servicesIds: number[],
  ): Promise<AttendanceType> {
    return this.service.createAttendance(servicesIds);
  }

  @Mutation(() => AttendanceType)
  async updateAttendance(
    @Args('AttendanceInput') input: AttendanceInputType,
  ): Promise<AttendanceType> {
    const { id, finished, duration } = input;

    const attendanceType = {
      id,
      finished,
      duration,
    } as AttendanceType;

    return this.service.updateAttendance(attendanceType);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomerServiceService } from './customer-service.service';
import { AttendanceType } from './types/attendance.type';
import { AttendanceInputType } from './types/input-types/attendance.input-type';
import { ServiceType } from './types/service.type';
import fs from 'node:fs';
@Resolver()
export class CustomerServiceResolver {
  constructor(private readonly service: CustomerServiceService) {}

  @Query(() => [ServiceType])
  async getAllServices(): Promise<ServiceType[]> {
    return this.service.getAllServices();
  }

  @Query(() => [AttendanceType])
  async getAllAttendances(): Promise<AttendanceType[]> {
    return this.service.getAllAttendances();
  }

  @Mutation(() => AttendanceType)
  async createAttendance(
    @Args('servicesIds', { type: () => [Int] }) servicesIds: number[],
  ): Promise<AttendanceType> {
    return this.service.createAttendance(servicesIds);
  }

  @Mutation(() => Int)
  async updateAttendance(
    @Args('AttendanceInput') input: AttendanceInputType,
  ): Promise<number> {
    const { id, finished, duration } = input;

    const attendanceType = {
      id,
      finished,
      duration,
    } as AttendanceType;

    await this.service.updateAttendance(attendanceType);

    return attendanceType.id;
  }
}

import { Field, ObjectType } from '@nestjs/graphql';
import { ServiceType } from './service.type';

@ObjectType('AttendanceType')
export class AttendanceType {
  @Field()
  id: number;

  @Field()
  status: number;

  @Field()
  duration?: number;

  @Field(() => [ServiceType])
  services: ServiceType[];
}

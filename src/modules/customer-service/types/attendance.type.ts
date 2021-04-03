import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ServiceType } from './service.type';

@ObjectType('AttendanceType')
export class AttendanceType {
  @Field(() => Int)
  id: number;

  @Field()
  finished: boolean;

  @Field({ nullable: true })
  duration?: number;

  @Field(() => [ServiceType])
  services: ServiceType[];
}

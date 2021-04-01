import { Field, ObjectType } from '@nestjs/graphql';
import { ServiceType } from './service.type';

@ObjectType('AttendanceType')
export class AttendanceType {
  @Field()
  id: number;

  @Field()
  finished: boolean;

  @Field({ nullable: true })
  duration?: number;

  @Field(() => [ServiceType])
  services: ServiceType[];
}

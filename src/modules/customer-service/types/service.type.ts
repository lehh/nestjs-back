import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ServiceType')
export class ServiceType {
  @Field()
  id: number;

  @Field()
  price: number;

  @Field()
  time: number;

  @Field()
  commission: number;
}

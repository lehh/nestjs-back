import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('ServiceType')
export class ServiceType {
  @Field(() => Int)
  id: number;

  @Field()
  price: number;

  @Field()
  time: number;

  @Field()
  commission: number;
}

import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('AttendanceInputType')
export class AttendanceInputType {
  @Field(() => Int)
  id: number;

  @Field()
  finished: boolean;

  @Field({ nullable: true })
  duration?: number;
}

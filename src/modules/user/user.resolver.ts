import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  @Mutation()
  async login(
    @Args('login', { type: () => String }) login: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<string> {
    if (login === 'client' && password === '1234') {
      return login;
    }

    if (login === 'professional' && password === '5678') {
      return login;
    }

    throw new UnauthorizedException('Invalid Credentials');
  }
}

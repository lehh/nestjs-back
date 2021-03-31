import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => String)
  welcome(): string {
    return 'Welcome to the graphql api!';
  }

  @Mutation(() => String)
  async login(
    @Args('password', { type: () => String }) password: string,
    @Args('login', { type: () => String }) login: string,
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

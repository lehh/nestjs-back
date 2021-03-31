import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  describe('login', () => {
    it('Should login if client credentials are correct', async () => {
      const credentials = {
        login: 'client',
        password: '1234',
      };

      const result = await resolver.login(credentials.login, credentials.password);

      expect(result).toEqual(credentials.login);
    });

    it('Should login if professional credentials are correct', async () => {
      const credentials = {
        login: 'professional',
        password: '5678',
      };

      const result = await resolver.login(credentials.login, credentials.password);

      expect(result).toEqual(credentials.login);
    });

    it('Should deny login if credentials are incorrect', () => {
      const credentials = {
        login: 'client',
        password: '123',
      };

      const expectedException = new UnauthorizedException('Invalid Credentials');

      return expect(resolver.login(credentials.login, credentials.password)).rejects.toThrow(
        expectedException,
      );
    });
  });
});

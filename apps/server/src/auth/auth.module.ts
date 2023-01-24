import { Module } from '@nestjs/common';
import constants from 'src/idp/constants';
import { IDPModule } from 'src/idp/idp.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [IDPModule.forRoot(constants.IDENTITY_PROVIDER_FIREBASE)],
  providers: [AuthResolver, GqlAuthGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

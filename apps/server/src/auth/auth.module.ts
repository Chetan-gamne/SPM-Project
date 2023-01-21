import { Module } from '@nestjs/common';
import constants from 'src/idp/constants';
import { IDPModule } from 'src/idp/idp.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';

@Module({
  imports: [IDPModule.forRoot(constants.IDENTITY_PROVIDER_FIREBASE)],
  providers: [AuthResolver, GqlAuthGuard, AuthService],
})
export class AuthModule {}

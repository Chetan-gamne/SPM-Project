import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { IDPModule } from 'src/IDP/idp.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gql-auth.guard';

@Module({
  imports: [IDPModule, DatabaseModule],
  controllers: [],
  providers: [GqlAuthGuard, AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}

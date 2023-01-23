import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreAuthMiddleware } from './auth/preauth.middleware';
import { DatabaseModule } from './database/database.module';
import { StorageModule } from './str/storage.module';
import constants from './str/constants';
@Module({
  imports: [
    DatabaseModule,
    StorageModule.forRoot(constants.STORAGE_PROVIDER_S3),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

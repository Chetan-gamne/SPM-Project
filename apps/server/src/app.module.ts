import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailModule } from './mail/mail.module';
import { NestModule } from '@nestjs/common';
import { PreauthMiddleware } from './IDP/preAuth.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    MailModule,
    DatabaseModule,
    AuthModule,
    StorageModule,
  ],
  controllers: [AppController],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(PreauthMiddleware).forRoutes({
//       path: '/hello',
//       method: RequestMethod.ALL,
//     });
//   }
// }
export class AppModule {}

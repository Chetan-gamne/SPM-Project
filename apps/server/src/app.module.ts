import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MailModule } from "./mail/mail.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from 'nestjs-pino';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       target: 'pino-pretty',
    //     },
    //   },
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: true,
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
        outputAs: "class",
      },
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      }
    }),
    MailModule,
    DatabaseModule,
    AuthModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

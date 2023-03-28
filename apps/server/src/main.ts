import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ bufferLogs: true});
  app.enableCors({  // wrong!  in my case, anyway
    origin: 'http://localhost:3001/auth/login',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  app.use(cookieParser());
  // app.useLogger(app.get(Logger));
  await app.listen(3001);
}
bootstrap();

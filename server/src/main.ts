import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { SocketIoAdapter } from "./socket-io.adapter";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableCors();
  app.useWebSocketAdapter(new SocketIoAdapter(app, true));

  await app.listen(3100, "0.0.0.0");
}

bootstrap();
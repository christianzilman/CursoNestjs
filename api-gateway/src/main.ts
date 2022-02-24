import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 app.useGlobalFilters(new AllExceptionFilter())

 //const { httpAdapter } = app.get(HttpAdapterHost);
//  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalInterceptors(new TimeOutInterceptor())

    const options = new DocumentBuilder()
      .setTitle('SuperFlight API Microservices')
      .setDescription('Sheduled Flight Appp')
      .setVersion('2.0.0')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, options)

    SwaggerModule.setup('/api/docs', app, document, {
      swaggerOptions:{
        filter: true,
      },
    })


  await app.listen(3001);
  //await app.listen(process.env.PORT || 3001);
}
bootstrap();

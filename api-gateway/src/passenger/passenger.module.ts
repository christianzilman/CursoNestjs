import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices/module';
import { RabbitMQ } from 'src/common/constants';
import { PassengerController } from './passenger.controller';

@Module({
  imports:[
    ClientsModule.register([{
      name: RabbitMQ.PassengerQueue,
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://fflhtudj:LcFkUtgklVrKKPGvoRIZWGzb-v7afnz3@chimpanzee.rmq.cloudamqp.com/fflhtudj'],
        queue: RabbitMQ.PassengerQueue,
        // queueOptions: {
        //   durable: false
        // }
      }
    }]),],
  controllers: [PassengerController]
})
export class PassengerModule {}

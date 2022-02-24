import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ClientsModule } from '@nestjs/microservices/module';
import { RabbitMQ } from 'src/common/constants';
import { FlightController } from './flight.controller';

@Module({
  imports:[
    ClientsModule.register([{
      name: RabbitMQ.FlightQueue,
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://fflhtudj:LcFkUtgklVrKKPGvoRIZWGzb-v7afnz3@chimpanzee.rmq.cloudamqp.com/fflhtudj'],//despuyes lo cambiare
        queue: RabbitMQ.FlightQueue,
        // queueOptions: {
        //   durable: false
        // }
      }
    }]),
    ClientsModule.register([{
      name: RabbitMQ.PassengerQueue,
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: RabbitMQ.PassengerQueue,
        // queueOptions: {
        //   durable: false
        // }
      }
    }]),
  ],
  controllers: [FlightController]
})
export class FlightModule {}

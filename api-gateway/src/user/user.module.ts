import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQ } from 'src/common/constants';

@Module({
  imports:[    
  ClientsModule.register([{
    name: RabbitMQ.UserQueue,
    transport: Transport.RMQ,
    options: {
      urls:  ['amqps://fflhtudj:LcFkUtgklVrKKPGvoRIZWGzb-v7afnz3@chimpanzee.rmq.cloudamqp.com/fflhtudj'],//[process.env.AMQP_URL],
      queue: 'users',//RabbitMQ.UserQueue,
       queueOptions: {
         durable: false
       }
    }
  }]),],
  controllers: [UserController]
})
export class UserModule {}

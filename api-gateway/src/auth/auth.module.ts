import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQ } from 'src/common/constants';

@Module({
  imports:[
    UserModule, 
    PassportModule, 
    ClientsModule.register([{
      name: RabbitMQ.UserQueue,
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://fflhtudj:LcFkUtgklVrKKPGvoRIZWGzb-v7afnz3@chimpanzee.rmq.cloudamqp.com/fflhtudj'],
        queue: RabbitMQ.UserQueue,
         queueOptions: {
           durable: false
         }
      }
    }])
    ,
    JwtModule.registerAsync({
    // cargamos de esta forma para que me lea las variables process
    useFactory: async () => ({
      secret: process.env.JWT_SECRET, //'JWTvClave3dd@Api',//process.env.JWT_SECRET,
      signOptions: { expiresIn: "12h" },//{ expiresIn: process.env.EXPIRES_IN },
    })}
  //   {
  //   secret: process.env.JWT_SECRET, //'JWTvClave3dd@Api',//process.env.JWT_SECRET,
  //   signOptions: { expiresIn: "12h" },//{ expiresIn: process.env.EXPIRES_IN },
  // }
  
  ),],
  controllers: [AuthController],
  providers:   [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}

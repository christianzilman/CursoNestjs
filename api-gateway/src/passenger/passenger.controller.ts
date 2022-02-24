import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RabbitMQ } from 'src/common/constants';
import { PassengerMSG } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PassengerDTO } from './dto/passenger.dto';

@ApiTags('passengers')
//@UseGuards(JwtAuthGuard)
@Controller('api/v2/passenger')
export class PassengerController 
{ 
    constructor(@Inject(RabbitMQ.PassengerQueue)  private _clientProxyPassenger: ClientProxy){        
    }

    @Post()
    create(@Body() passengerDTO: PassengerDTO): Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.CREATE, passengerDTO)
    }

    @Get()
    findAll(): Observable<IPassenger[]>
    {
        console.log('www')
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '')
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IPassenger>{
        return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id: string,@Body() passengerDTO: PassengerDTO): Observable<IPassenger>
    {
        return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {id, passengerDTO})
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any>{
        return this._clientProxyPassenger.send(PassengerMSG.DELETE, id)
    }
}

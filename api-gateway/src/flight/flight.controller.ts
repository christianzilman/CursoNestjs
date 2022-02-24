import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FlightMSG, RabbitMQ } from 'src/common/constants';
import { IFlight } from '../common/interfaces/flight.interface';
import { FlightDTO } from './dto/flight.dto';
import { PassengerMSG } from '../common/constants';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('flights')
//@UseGuards(JwtAuthGuard)
@Controller('api/v2/flight')
export class FlightController 
{

    constructor(@Inject(RabbitMQ.FlightQueue) private _clientProxyFlight: ClientProxy
     , 
     @Inject(RabbitMQ.PassengerQueue) private _clientProxyPassenger: ClientProxy
    ){}


    @Post()
    create(@Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.CREATE, flightDTO)
    }

    @Get()
    findAll(): Observable<IFlight[]> {
        return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '')
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO): Observable<IFlight> {
        return this._clientProxyFlight.send(FlightMSG.UPDATE, { id, flightDTO })
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> {
        return this._clientProxyFlight.send(FlightMSG.DELETE, id)
    }


    @Post(':flightId/passenger/:passengerId')
    async addPassenger(
        @Param('flightId') flightId: string,
        @Param('passengerId') passengerId: string,
    ) {

        console.log('llegooooo')
        console.log(flightId)
        console.log(passengerId)

        //return null
         const passenger = await this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, passengerId).toPromise()


        if (!passenger)
        {
            console.log('no hay passenger')
            throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND)
        }

        return this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
            flightId,
            passengerId,
        })
    }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlightDTO } from './dto/flight.dto';
import { FLIGHT } from '../common/models/models';
import { IFlight } from '../common/interfaces/flight.interface';
import { Model } from 'mongoose';
import axios from 'axios';
import * as moment from 'moment'
import { ILocation } from 'src/common/interfaces/location.interface';
import { IWeather } from 'src/common/interfaces/weather.location';

@Injectable()
export class FlightService 
{
    constructor(@InjectModel(FLIGHT.name) private readonly modelFlight: Model<IFlight> ){

    }

   async getLocation(destinationCity:string): Promise<ILocation>
   {
        const {data} = await axios.get(`https://www.metaweather.com/api/location/search/?query=${destinationCity}`)

        return data[0]
   }

   async getWeather(woeid: number, flightDate: Date): Promise<IWeather[]>
   {
        const dateFormat = moment.utc(flightDate).format()

        const year = dateFormat.substring(0,4)
        const month = dateFormat.substring(5,7)
        const day = dateFormat.substring(8,10)

        const {data} = await axios.get(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}`)


        return data
   }

   assign({_id, pilot, destinationCity, flightDate, passengers} : IFlight,
        weather: IWeather[]
    ): IFlight
   {
        return Object.assign({
            _id, 
            pilot, 
            destinationCity, 
            flightDate, 
            passengers,
            weather})
   }


    async create(flightDTO:FlightDTO): Promise<IFlight> {
        
        const newFlight = new this.modelFlight(flightDTO)

        return await newFlight.save()
    }

    async findAll(): Promise<IFlight[]> {
        return await this.modelFlight.find()
    }

    async findOne(id:string) : Promise<IFlight> {

        const flight =  await this.modelFlight.findById(id)
        const location: ILocation = await this.getLocation(flight.destinationCity)
        const weather: IWeather[] = await this.getWeather(location.woeid, flight.flightDate)



        return this.assign(flight, weather)
    }

    async update(id: string, flightDTO: FlightDTO): Promise<IFlight>
    {
        return this.modelFlight.findByIdAndUpdate(id, flightDTO)
    }

   async delete(id:string) {
        await this.modelFlight.findByIdAndDelete(id)
        return {status: HttpStatus.OK, msg: "Deleted"}    
   }

  async addPassenger(flightId:string, passengerId: string): Promise<IFlight> {

    try{
        const flight = await this.modelFlight.findByIdAndUpdate(
            flightId, 
                {
                    $addToSet : {passengers: passengerId}
                }, 
            {new :true}
        )// se saco el populate piorqyu quería duplicar los valores y daba error de referencias

       return flight
    }catch(error)
    {
        console.log(error)
        throw error
    }
    
  }
}

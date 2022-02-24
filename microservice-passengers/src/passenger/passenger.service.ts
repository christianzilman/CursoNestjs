import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PASSENGER } from 'src/common/models/models';
import { PassengerDTO } from './dto/passenger.dto';
import { Model } from 'mongoose';
import { Passenger } from './schema/passenger.schema';

@Injectable()
export class PassengerService 
{

    constructor(@InjectModel(Passenger.name) private readonly modelPassenger: Model<IPassenger>){

    }

    async create(passengerDTO:PassengerDTO): Promise<IPassenger> 
    {
            const newPassenger = new this.modelPassenger(passengerDTO)

            return  await newPassenger.save()
    }

    async findAll(): Promise<IPassenger[]>
    {
        return await this.modelPassenger.find()
    }

    async findOne(id:string): Promise<IPassenger>{
        
        return await this.modelPassenger.findById(id)
    }

    async update(id:string, passengerDTO: PassengerDTO): Promise<IPassenger> 
    {
        return await this.modelPassenger.findByIdAndUpdate(id, passengerDTO, {new: true})

    }

   async delete(id:string) {

        await this.modelPassenger.findByIdAndDelete(id)

        return {status: HttpStatus.OK, msg: "Deleted"}       
   }
}

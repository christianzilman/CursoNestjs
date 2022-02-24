import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


// export const PassengerSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     email: {type: String, required: true},
// })

@Schema()
export class Passenger
{
    @Prop({ required: true})
    name: string

    @Prop({required: true, unique: true})
    email: string
}

//PassengerSchema.index({email: 1}, {unique: true})


export const PassengerSchema = SchemaFactory.createForClass(Passenger);
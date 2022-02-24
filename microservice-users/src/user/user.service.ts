import { Injectable, HttpStatus } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
import { USER } from '../common/models/models';
import { IUser } from 'src/common/interfaces/user.interfaces';

@Injectable()
export class UserService 
{
    constructor(@InjectModel(USER.name) private readonly modelUser: Model<IUser>){

    }

    async hashPassword(password:string): Promise<string> {

        const salt = await bcrypt.genSalt(10)

        return await bcrypt.hash(password, salt)
    }

    async create(userDTO:UserDTO): Promise<IUser> {
        
        const hash = await this.hashPassword(userDTO.password)
        const newUser = new this.modelUser({...userDTO, password: hash})

        return await newUser.save()
    }

    async findAll(): Promise<IUser[]> {
        return await this.modelUser.find()       
    }
    
    async findOne(id:string): Promise<IUser> {
        return await this.modelUser.findById(id)      
    }

    async findByUsername(username: string)
    {
        return await this.modelUser.findOne({username})      
    }

    async checkPassword(password: string, passwordDB: string): Promise<boolean>
    {
        return await bcrypt.compare(password, passwordDB)
    }

    async update(id:string, userDTO: UserDTO): Promise<IUser> {
        const hash = await this.hashPassword(userDTO.password)
        const user = {...userDTO, password: hash}

        return await this.modelUser.findByIdAndUpdate(id,user, { new: true})
    }

   async delete(id:string) {
        await this.modelUser.findByIdAndDelete(id)

        return {status: HttpStatus.OK, msg: "Deleted"}
   }
}

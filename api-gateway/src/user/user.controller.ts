import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { IUser } from 'src/common/interfaces/user.interfaces';
import { RabbitMQ, UserMSG } from 'src/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('api/v2/user')
export class UserController 
{
    constructor(@Inject(RabbitMQ.UserQueue) private readonly _clientProxyUser: ClientProxy){}

    // async onApplicationBootstrap() {
    //     await this._clientProxyUser.connect();
    // }

    @Post()
    create(@Body() userDTO: UserDTO): Observable<IUser>
    {
        return this._clientProxyUser.send(UserMSG.CREATE, userDTO)
    }

    @Get()
    findAll(): Observable<IUser[]>
    {
        console.log('llega')
        return this._clientProxyUser.send(UserMSG.FIND_ALL, '')
    }

    @Get(':id')
    findOne(@Param('id') id : string): Observable<IUser[]>
    {
        return this._clientProxyUser.send(UserMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id: string ,@Body() userDTO: UserDTO): Observable<IUser>
    {
        return this._clientProxyUser.send(UserMSG.UPDATE, {id , userDTO})
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<any> 
    {
        return this._clientProxyUser.send(UserMSG.DELETE, id)
    }
}

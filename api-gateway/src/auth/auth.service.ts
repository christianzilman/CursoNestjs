import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UserDTO } from 'src/user/dto/user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQ, UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interfaces/user.interfaces';
import { timeout } from 'rxjs/operators';


@Injectable()
export class AuthService 
{

    constructor(
        @Inject(RabbitMQ.UserQueue) private readonly userService: ClientProxy,
        private readonly jwtService: JwtService)
    {

    }
   

    async validateUser(username: string, password: string): Promise<any>
    {  

        const user = this.userService.send(UserMSG.VALID_USER, {
            username,
            password,
        }).toPromise()
        
        if(user)
            return user

        return null     
        
    }


    async signIn(user: any)
    {
        const payload = {
            username: user.username,
            sub: user._id,
        }
        
        return {access_token: this.jwtService.sign(payload)}
    }


    async signUp(userDTO: UserDTO)
    {
        return await this.userService.send( UserMSG.CREATE, userDTO).toPromise()
    }
}

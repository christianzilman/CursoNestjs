import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
//import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
//import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { UserMSG } from '../common/constants';

//@UseGuards(JwtAuthGuard)
@Controller()
export class UserController 
{

    constructor(private readonly userService: UserService){}
    
    @MessagePattern(UserMSG.CREATE)
    create(@Payload() userDTO: UserDTO)
    {
        return this.userService.create(userDTO)
    }

    @MessagePattern(UserMSG.FIND_ALL)
    findAll(){
        return this.userService.findAll()
    }

    @MessagePattern(UserMSG.FIND_ONE)
    findByOne(@Payload() id: string){
        return this.userService.findOne(id)
    }

    @MessagePattern(UserMSG.UPDATE)
    update(@Payload() payLoad: any){
        return this.userService.update(payLoad.id, payLoad.userDTO)
    }    

    @MessagePattern(UserMSG.DELETE)
    delete(@Payload() id : string){
        return this.userService.delete(id)
    }

    @MessagePattern(UserMSG.VALID_USER)
    async validateUser(@Payload() payload): Promise<any>
    {
        const user = await this.userService.findByUsername(payload.username)

        const isValidPassword = await this.userService.checkPassword(payload.password, user.password)
        
        if(user && isValidPassword)
            return user

        return null
    }
}

// import { Controller, Post, Req, Body, UseGuards, Get } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
// import { UserDTO } from 'src/user/dto/user.dto';
// import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { AuthGuard } from '@nestjs/passport';

import { Controller, Request, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';


//@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController 
{

    // @Get('prueba')
    // prueba() {
    //     return 'sss'
    // }

    constructor(private readonly authService: AuthService){

    }

    //@UseGuards(AuthGuard('local'))
    @UseGuards(LocalAuthGuard)    
    @Post('login')
    async login(@Request() req) {
        return req.user;
    }

    @UseGuards(LocalAuthGuard)    
    @Post('signin')
    async signIn(@Req() req)
    {
        //try{
            console.log('asss')
            console.log(req.user)
            //return req.user
            return await this.authService.signIn(req.user)
        // }catch(error){
        //     console.log(``)
        //     throw error
        // }        
    }

    @Post('signup')
    async signUp(@Body() userDTO: UserDTO)
    {        
        return await this.authService.signUp(userDTO)
    }
}

// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from '@nestjs/passport'
// //import { Strategy } from "passport-local";
// import { Strategy, ExtractJwt } from 'passport-jwt';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor()
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,//'JWTvClave3dd@Api'
          })
    }


    async validate(payLoad: any)
    {
        return {userId: payLoad.sub, username: payLoad.username}
    }
}
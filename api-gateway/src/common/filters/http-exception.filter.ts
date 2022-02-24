// import { Catch, ArgumentsHost } from '@nestjs/common';
// import { BaseExceptionFilter } from '@nestjs/core';

// @Catch()
// export class AllExceptionsFilter extends BaseExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     super.catch(exception, host);
//   }
// }
  

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response } from 'express';


//https://docs.nestjs.com/exception-filters

//@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter
{


    private readonly logger = new Logger(AllExceptionFilter.name)

    catch(exception: any, host: ArgumentsHost) 
    {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse<Response>()
        const req = ctx.getRequest<Request>()
        
        console.log('inicio 1')

        const status = exception instanceof HttpException? exception.getStatus():
        HttpStatus.INTERNAL_SERVER_ERROR

        console.log('inicio 2')


        const msg = exception instanceof HttpException? exception.getResponse(): exception

        console.log(exception)


        this.logger.error(`Status ${status} Error: ${JSON.stringify(msg)}`)

        console.log(`Status ${status} Error: ${JSON.stringify(msg)}`)

        res.status(status).json(
            {
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: req.url,
            }
        )
        
    }

}
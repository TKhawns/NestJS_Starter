import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
require('dotenv').config()

  @Injectable()
  export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      console.log(request.cookies);
      if (request) {
        if (!request.headers.authorization) {
          return false;
        }
        Logger.log("abc", request.headers.authorization);

        const result  = await this.validateToken(request.headers.authorization.toString()); // ok
        request.user = result[0];
        // if (result[1]) {
        //   console.log(request.user.toResponseObject());
        // }

        return true;
      }
        return true;  
    }
  
    async validateToken(auth: string) {
      if (auth.split(' ')[0] !== 'Bearer') {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      const token = auth.split(' ')[1];
      
      try {
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;

      } catch (err) {
        const message = 'Access Token error: ' + (err.message || err.name);
        if (message) {
            const refreshDecode: any = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
            return [refreshDecode, 1];
        }
        else {
            const refreshMessage = 'Refresh Token error: ' + (err.message || err.name);
            throw new HttpException(refreshMessage, HttpStatus.UNAUTHORIZED);
        }
      }
    }
  }
  
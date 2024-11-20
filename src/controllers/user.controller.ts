import { Body, Controller, Post, Response, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserDTO } from "../dto/user.dto";

  @Controller()
  export class UserController {
    constructor(private userService: UserService) {}

    @Post('api/user')
    showOneUser(@Body('email') email: string) {
      return this.userService.findUserByEmail(email);
    }
  
    @Post('user/login')
    @UsePipes(new ValidationPipe())
    async login(@Body() data: UserDTO, @Response() res: any) {
      const user = await this.userService.login(data);
      res.cookie('accessToken', user.accessToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      });
      res.cookie('refreshToken', user.refreshToken, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      });
      return res.send(user);
    }

    @Post('auth/refresh')
    refreshToken(@Body('refreshToken') refreshToken: string) {
      return this.userService.refreshToken(refreshToken);
    }
  
    @Post('user/register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDTO) {
      return this.userService.register(data);
    }
  }
  
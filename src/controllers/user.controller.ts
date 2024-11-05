import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
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
    login(@Body() data: UserDTO) {
      return this.userService.login(data);
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
  
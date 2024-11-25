import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleOauthGuard } from "src/guard/google-oauth.guard";
import { MailerService } from "@nestjs-modules/mailer";
import { AuthService } from "src/services/auth.service";
import { Response } from "express";

  @Controller()
  export class AuthController {
    constructor(private mailerService: MailerService, private authService: AuthService) {}

    // @Get('/auth/google/redirect')
    // @UseGuards(GoogleOauthGuard)
    // async googleRedirect(@Req() req, @Res() res) {
    //   const user = req.user;
    //   const token = 'example-token';

    //   // Gửi email xác nhận
    //   const verifyUrl = `http://localhost:3000/verify-email?token=${token}`;
    //   await this.mailerService.sendMail({
    //     to: user.email,
    //     subject: 'Email Confirmation',
    //     text: `Confirm your email: ${verifyUrl}`,
    //     html: `<a href="${verifyUrl}">Confirm your email</a>`,
    //   });
  
    //   return res.redirect(`http://localhost:3000/success?email=${user.email}`);
    // }

    @Get("/google")
    @UseGuards(GoogleOauthGuard)
    async googleAuth(@Req() req) {}
  
    @Get('google/redirect')
    @UseGuards(GoogleOauthGuard)
    googleAuthRedirect(@Req() req, @Res() res: Response) {
      return this.authService.googleLogin(req, res)
    }
  }
  
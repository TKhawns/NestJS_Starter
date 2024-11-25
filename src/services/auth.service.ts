import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Response } from "express"
import { addMinutes } from 'date-fns';

@Injectable()   
export class AuthService {
    constructor(private mailerService: MailerService) {}

    async googleLogin(req, res:Response) {
        if (!req.user) {
          return 'No user from google'
        }
        
        const expirationTime = addMinutes(new Date(), 2);
        const expirationTimestamp = expirationTime.getTime();
        const verifyUrl = `http://localhost:3000/link-verify?expires=${expirationTimestamp}&email=${req.user.email}`;
        console.log(expirationTime, " ", expirationTimestamp, " ");
        await this.mailerService.sendMail({
            to: "21020343@vnu.edu.vn",
            subject: 'Email Confirmation',
            text: `Confirm your email (valid for 24 hours): ${verifyUrl}`,
            html: `<a href="${verifyUrl}" target="_blank">Confirm your email</a> (valid for 24 hours)`,
      });
  
        res.redirect(`http://localhost:3000/verify`);
      }
}

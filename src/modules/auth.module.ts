import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { GoogleOauthGuard } from 'src/guard/google-oauth.guard';
import { GoogleStrategy } from 'src/guard/google-oauth.strategy';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleOauthGuard, GoogleStrategy],
})
export class AuthModule {}
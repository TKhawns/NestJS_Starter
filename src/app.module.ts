import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { UserModule } from './modules/user.module';
import { ProductModule } from './modules/product.module';
import { ColorModule } from './modules/color.module';
import { AuthModule } from './modules/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

require('dotenv').config();
 
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'live.smtp.mailtrap.io',
        port: 587,
        auth: {
          user: "api",
          pass: "d6bedb16a00cee0607d007ba585ec559",
        },
      },
      defaults: {
        from: "hello@demomailtrap.com",
      },
    }),
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    ProductModule,
    ColorModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

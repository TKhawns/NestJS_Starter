import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { UserModule } from './modules/user.module';
import { ProductModule } from './modules/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

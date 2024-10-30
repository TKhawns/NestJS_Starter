import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entity/user.entity";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ColorEntity } from "src/entity/color.entity";
import { ColorController } from "src/controllers/color.controller";
import { ColorService } from "src/services/color.service";

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}

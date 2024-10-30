import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ProductController } from "src/controllers/product.controller";
import { ProductService } from "src/services/product.service";
import { ProductEntity } from "src/entity/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

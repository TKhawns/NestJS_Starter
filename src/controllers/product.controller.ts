import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { ProductDTO } from "../dto/product.dto";
import { AuthGuard } from "src/guard/auth.guard";

  @Controller()
  export class ProductController {
    constructor(private productService: ProductService) {}

    @Get('user/product')
    showProductById(@Body('id') id: string) {
      return this.productService.findProductById(id);
    }
  
    @Post('user/create-product')
    @UsePipes(new ValidationPipe())
    createProduct(@Body() data: ProductDTO) {
      return this.productService.createProduct(data);
    }
  
    @Post('user/update-product')
    @UsePipes(new ValidationPipe())
    updateProduct(@Body() data: ProductDTO) {
      return this.productService.updateProduct(data);
    }

    @Get('user/product-name')
    searchProduct(@Body('query') query: string) {
        return this.productService.searchProductByName(query);
    }

    @Get('user/product-list')
    @UseGuards(new AuthGuard())
    getAllProduct() {
      return this.productService.getAllProduct();
    }
  }
  
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/auth.guard";
import { ColorService } from "src/services/color.service";

  @Controller()
  export class ColorController {
    constructor(private colorService: ColorService) {}

    @Get('user/color-list')
    @UseGuards(new AuthGuard())
    getListColor() {
      return this.colorService.getAllColors();
    }
  }
  
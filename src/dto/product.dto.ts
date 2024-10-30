import { IsNotEmpty } from "class-validator";

export class ProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cost: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  url_image: string;
}

export class ProductRO {
  id: string;
  created: Date;
  name: string;
  cost: number;
  description: string;
  url_image: string;
}

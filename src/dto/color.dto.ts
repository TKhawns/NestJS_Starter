import { IsNotEmpty } from "class-validator";

export class ColorDTO {
  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  id: number;
}

export class ColorRO {
  id: string;
  color: string;
}

import { InjectRepository } from "@nestjs/typeorm";
import {  Repository } from "typeorm";
import { ColorEntity } from "src/entity/color.entity";

export class ColorService {
    constructor(
        @InjectRepository(ColorEntity)
        private colorRepository: Repository<ColorEntity>
    ) {}

    async getAllColors() {
        const colors = await this.colorRepository.find();
        return colors.map((color) => color.toResponseObject());
    }
}

import { ColorRO } from "src/dto/color.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('colors')
export class ColorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({type: 'text'})
    color: string

    toResponseObject(): ColorRO {
        const {id, color} = this;
        const responseObject: ColorRO = {
            id,
            color
        };
        if (this.id) {
            responseObject.id = this.id;
        }
        if (this.color) {
            responseObject.color = this.color;
        }
        return responseObject;
    }
}
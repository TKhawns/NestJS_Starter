import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductRO } from "../dto/product.dto";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    created: Date

    @Column({type: 'text', unique: true})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'int'})
    cost: number

    @Column({type: 'text'})
    url_image: string


    toResponseObject(): ProductRO {
        const {id, created, name, description, cost, url_image} = this;
        const responseObject: ProductRO = {
            id,
            created,
            name,
            description,
            cost,
            url_image
        };

        if (this.id) {
            responseObject.id = this.id;
        }
        if (this.created) {
            responseObject.created = this.created;
        }
        if (this.name) {
            responseObject.name = this.name;
        }
        if (this.description) {
            responseObject.description = this.description;
        }
        if (this.cost) {
            responseObject.cost = this.cost
        }
        if (this.url_image) {
            responseObject.url_image = this.url_image;
        }

        return responseObject;
    }
}
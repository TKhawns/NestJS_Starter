import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../entity/product.entity";
import { Like, Repository } from "typeorm";
import { ProductDTO } from "../dto/product.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
    ) {}

    async searchProductByName(query: string) {
        const products = await this.productRepository.findBy({
        name: Like(`%${query}%`),});

        return products.map(product => product.toResponseObject());
    }

    async createProduct(data: ProductDTO) {
        const {name} = data;
        let product = await this.productRepository.findOne({where: {name}});

        if (product) {
            throw new HttpException(
                "Duplicated product",
                HttpStatus.BAD_REQUEST,
            )
        }

        product = this.productRepository.create(data);
        await this.productRepository.save(product);
        return product.toResponseObject();
    }

    async updateProduct(data: ProductDTO) {
        const product = this.productRepository.create(data);
        await this.productRepository.save(product);
    }

    async findProductById(id: string) {
        const product = await this.productRepository.findOne({where: {id}});
        return product.toResponseObject();
    }

    async getAllProduct() {
        const products = await this.productRepository.find();
        return products.map((product) => product.toResponseObject());
    }
}

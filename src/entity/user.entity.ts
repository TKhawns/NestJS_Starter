import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserRO } from "../dto/user.dto";
import * as jwt from "jsonwebtoken";
require('dotenv').config()

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @CreateDateColumn()
    created: Date

    @Column({type: 'text', unique: true})
    email: string

    @Column({type: 'text'})
    password: string

    @Column({type: 'text', nullable: true })
    refreshToken: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async comparePassowrd(inputPass: string): Promise<boolean> {
        return await bcrypt.compare(inputPass, this.password);
    }

    toResponseObject(showToken: boolean =  true, isRefresh: boolean = true): UserRO {
        const {id, email, created, accessToken, refreshToken} = this;
        const responseObject: UserRO = {
            id,
            email,
            created,
            accessToken,
            refreshToken,
        };

        if (this.id) {
            responseObject.id = this.id;
        }
        if (this.email) {
            responseObject.email = this.email;
        }
        if (this.created) {
            responseObject.created = this.created;
        }
        if (showToken) {
            responseObject.accessToken = this.accessToken;
            if (isRefresh) responseObject.refreshToken = this.getRefreshToken;
        }
        return responseObject;
    }

    private get accessToken(): string {
        const {id, email} = this;
        return jwt.sign({id, email}, process.env.SECRET_KEY, {expiresIn: '60m'});
    }

    private get getRefreshToken(): string {
        const {id, email} = this;
        return jwt.sign({id, email}, process.env.REFRESH_SECRET_KEY);
    }
}
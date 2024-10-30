import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entity/user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "../dto/user.dto";
import { HttpException, HttpStatus } from "@nestjs/common";

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },});
    return user.toResponseObject(false);
  }

  async login(data: UserDTO) {
    const { email, password } = data;
    let user = await this.userRepository.findOne({ where: { email } });
    // If user not found or wrong password
    if (!user || !(await user.comparePassowrd(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    // update and save refresh Token to Database.
    user.refreshToken = user.toResponseObject().refreshToken;
    const status = await this.userRepository.save(user);
    console.log(status);
    return user.toResponseObject();
  }

  async register(data: UserDTO) {
    const { email } = data;
    let user = await this.userRepository.findOne({ where: { email } });
    // If duplicate user
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
}

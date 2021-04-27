import { Injectable } from '@nestjs/common';
import { PasswordEncrypter } from 'src/utils/password-encrypter';
import { RoleOptions } from '../auth/authorization/role.decorator';
import { RoleCode, RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePushIdDto } from './dto/update_push_id.dto';
import { UserStatus } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    if (createUserDto.roleId) {
      newUser.role = await this.roleService.findOne(createUserDto.roleId);
    }
    newUser.role = await this.roleService.findByCode(RoleCode.USER);
    newUser.password = PasswordEncrypter.encrypt(createUserDto.password);

    const { password, ...data } = await this.userRepository.save(newUser);
    return data;
  }

  async findAll() {
    return this.userRepository.find({
      select: ['email', 'id', 'name', 'status'],
      relations: ['role'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'status'],
      relations: ['role'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    user.role = await this.roleService.findOne(updateUserDto.roleId);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      return null;
    }
  }

  async updatePushId(updatePushIdDto: UpdatePushIdDto, userToken: any) {
    const {} = userToken;
    const user = await this.userRepository.findOne(userToken.id);
    user.push_id = updatePushIdDto.pushId;
    const userDB = await this.userRepository.save(user);
    const { password, status, ...data } = userDB;
    return data;
  }

  async findAdmin() {
    const role = await this.roleService.findByCode(RoleOptions.Admin);
    return this.userRepository.find({ where: { role: role.id } });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    user.status = UserStatus.DELETE;
    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email, status: UserStatus.ACTIVE },
      relations: ['role'],
    });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // GET - All Users
  async AllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  // GET - Task count
  async TaskCount(): Promise<Array<{ userId: number; taskCount: number }>> {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.todos', 'todo')
      .select('user.userId', 'u-id')
      .addSelect('COUNT(todo.id)', 'count')
      .groupBy('user.userId')
      .getRawMany();

    console.log('XXX: ', data);
    // trun to num
    return data.map((row) => ({
      userId: Number(row.id),
      taskCount: Number(row.count),
    }));
  }

  // GET - get user by ID
  async findUser(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ userId: id });
  }

  // POST - Create a new user
  async newUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  //DELETE - Delete user (only if all the tasks are done)
  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { userId: id },
      relations: ['todos'],
    });
    if (!user) {
      throw new NotFoundException('User with this id is not found');
    }

    // block if there are tasks
    const hasUnfinishedTasks = user.todos.some((todo) => !todo.isCompleted);
    if (hasUnfinishedTasks) {
      throw new BadRequestException(
        'Cannot delete user: They still have task assigned',
      );
    }

    // delete if there are no tasks
    await this.userRepository.remove(user);
    return { message: 'User deleted Successfully' };
  }
}

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

  // Get all users
  async AllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Get total task count per user
  async TaskCount(): Promise<Array<{ userId: number; taskCount: number }>> {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.todos', 'todo')
      .select('user.userId', 'userId')
      .addSelect('COUNT(todo.id)', 'taskCount')
      .groupBy('user.userId')
      .getRawMany();

    return data.map((row) => ({
      userId: Number(row.userId),
      taskCount: Number(row.taskCount),
    }));
  }

  // Get user by ID
  async findUser(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ userId: id });
  }

  // Create a new user
  async newUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  // Delete user only if all tasks are completed
  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { userId: id },
      relations: ['todos'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const hasUnfinishedTasks = user.todos.some((todo) => !todo.isCompleted);
    if (hasUnfinishedTasks) {
      throw new BadRequestException(
        `Cannot delete user ${id}: Unfinished tasks are still assigned`,
      );
    }

    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}

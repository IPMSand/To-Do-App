import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  // todos: any;
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  // GET - get all the todo
  async AllTodos(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  // GET - get user's all task by userId
  async AllTodoOfUser(id: number): Promise<Todo[]> {
    const tasks = await this.todoRepository.find({ where: { userId: id } });

    if (tasks.length === 0) {
      throw new NotFoundException('No Tasks not found for this User.');
    }
    return tasks;
  }

  // POST - create a new todo
  async newTask(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodos = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(newTodos); // erro r tryrun
  }

  // PATCH(update) - update if the task is done
  async taskDone(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const taskFind = await this.todoRepository.findOneBy({ id });
    if (!taskFind) {
      throw new NotFoundException('No Task found for update');
    }
    Object.assign(taskFind, updateTodoDto);
    return await this.todoRepository.save(taskFind);
  }

  // PATCH(update) - assign a task to user
  async assignTask(id: number, assignTodoDto): Promise<Todo> {
    const result = await this.todoRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException('No Task found for update');
    }
    // Object.assign(result, assignTodoDto);
    // return await this.todoRepository.save(result);

    // merge the userId
    this.todoRepository.merge(result, assignTodoDto);
    return await this.todoRepository.save(result);
  }

  // DELETE - delete the todo
  async removeTask(id: number): Promise<void> {
    const result = await this.todoRepository.delete({ id });
    console.log('Which id deleting?:', id);

    if (result.affected === 0) {
      throw new NotFoundException('No User found for this id');
    }
    console.log('ok deleted');
  }
}

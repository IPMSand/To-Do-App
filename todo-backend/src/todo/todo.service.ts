import { Body, Injectable, NotFoundException } from '@nestjs/common';
// import { Todoc } from './todo.model';
// import { v1 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  todos: any;
  // private todos: Todo[] = [];
  // //private todos = ['task1', 'task2', 'task3'];
  // todoService: any;
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>, 
  ) {}

  // ---get all the tasks --
  async getAllTasks(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  // --- create a task--
  async createTask(
    taskName: string,
    taskDescription: string,
    isCompleted: boolean,
    isCreatedDay: Date,
  ): Promise<Todo> {
    const newTodos = this.todoRepository.create({
      taskName,
      taskDescription,
      isCompleted,
      isCreatedDay,
    });
    // this.todoRepository.save(newTodos);
    // return newTodos;
    return await this.todoRepository.save(newTodos); // erro r tryrun
  }

  // update a task-- later hvae DTO
  async updateTask(id: number, isCompleted: boolean): Promise<Todo> {
    const taskFind = await this.todoRepository.findOneBy({ id });
    if (!taskFind) {
      throw new NotFoundException('No Task found for update');
    }
    // this.todos = this.todos.filter((t) => t.id !== id);
    taskFind.isCompleted = isCompleted;
    return await this.todoRepository.save(taskFind);
  }

  // delete a task
  async removeTask(id: number): Promise<void> {
    const indexFind = await this.todoRepository.delete({ id });
    console.log('Which id deleting?:', id);
    if (!indexFind) {
      throw new NotFoundException('No --'); // this is not working
    }
    // return await this.todoRepository = this.todoRepository.filter({id});
    console.log('ok deleted');
  }
}

import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  //private todos = ['task1', 'task2', 'task3'];
  todoService: any;

  // ---get all the tasks --
  getAllTasks() {
    return this.todos;
  }

  // --- create a task--
  createTask(
    taskName: string,
    taskDescription: string,
    isCompleted: boolean,
    isCreatedDay: Date,
  ) {
    const Todos = {
      id: uuid(),
      taskName,
      taskDescription,
      isCompleted,
      isCreatedDay,
    };
    this.todos.push(Todos);
    return Todos;
  }

  // update a task-- later hvae DTO
  updateTask(id: string, isCompleted: boolean) {
    const taskFind = this.todos.find((t) => t.id === id);
    if (!taskFind) {
      throw new NotFoundException('No Task found for update');
    }
    // this.todos = this.todos.filter((t) => t.id !== id);
    taskFind.isCompleted = isCompleted;
    return taskFind;
  }

  // delete a task
  removeTask(id: string): void {
    const indexFind = this.todos.find((t) => t.id === id);
    if (!indexFind) {
      throw new NotFoundException('No --');
    }
    this.todos = this.todos.filter((t) => t.id !== id);
  }
}

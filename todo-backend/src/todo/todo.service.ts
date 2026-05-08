import { Body, Injectable } from '@nestjs/common';
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
}

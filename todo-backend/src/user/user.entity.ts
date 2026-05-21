import { Todo } from 'src/todo/todo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column()
  userName!: string;

  @Column()
  email!: string;

  @CreateDateColumn()
  CreatedAt!: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos!: Todo[];

  taskCount?: number;
}

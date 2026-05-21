import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  taskName!: string;

  @Column({ default: false })
  isCompleted!: boolean;

  @CreateDateColumn()
  taskCreatedDay!: Date;

  @Column({ default: null })
  completedDay?: Date;

  @Column({ type: 'int', nullable: true })
  userId!: number | null;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user!: User;
}

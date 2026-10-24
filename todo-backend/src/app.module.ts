import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';


import * as dotenv from 'dotenv';
import * as path from 'path';
import { User } from './user/user.entity';
import { Todo } from './todo/todo.entity';
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
// console.log('[' + process.env.DB_PASSWORD + ']');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'todoapp',
      synchronize: true,
      logging: true,
      entities: [Todo, User],
    }),
    TodoModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/todo.entity';

// Force the system to find the .env file relative to this module file
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '..', '.env') }); 
console.log('[' + process.env.DB_PASSWORD + ']');
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD, // Safely hidden now!
      database: 'todoapp',
      synchronize: true,
      logging: true,
      entities: [Todo],
    }),
    TodoModule,
  ],
})
export class AppModule {}
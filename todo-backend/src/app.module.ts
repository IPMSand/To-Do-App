import { Module } from '@nestjs/common';
// import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: '',
      synchronize: true,
      logging: true,
      entities: [Todo],
      // autoLoadEntities: true,
    }),
    TodoModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

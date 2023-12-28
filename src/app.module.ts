import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TodoController } from "./todo/controller";
import { TodoService } from "./todo/service";
import { Todo, TodoSchema } from "./todo/model";
import { UserController } from "./user/controller";
import { UserService } from "./user/service";
import { User, UserSchema } from "./user/model";
import config from "./config";

@Module({
  imports: [
    MongooseModule.forRoot(config.db_url, {}),
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TodoController, UserController],
  providers: [TodoService, UserService],
})
export class AppModule {}

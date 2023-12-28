import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { Todo } from "./model";
import { TodoService } from "./service";
import { AuthGuard } from "src/helper/auth.guard";
import { TodoDTO } from "./todo.dto";
import { UserIdDTO } from "src/user/user.dto";

@Controller("todos")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() { userId: owner }: UserIdDTO): Promise<Todo[]> {
    return this.todoService.findAll({ owner });
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(
    @Request() { userId: owner }: UserIdDTO,
    @Param("id") id: string,
  ): Promise<Todo> {
    return this.todoService.findOne({ _id: id, owner });
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() { userId }: UserIdDTO,
    @Body() todo: Todo,
  ): Promise<TodoDTO> {
    return this.todoService.create({ ...todo, owner: userId });
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  async update(
    @Request() { userId }: UserIdDTO,
    @Param("id") id: string,
    @Body() todo: Todo,
  ): Promise<Todo> {
    return this.todoService.update(userId, id, todo);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  async remove(
    @Request() { userId }: UserIdDTO,
    @Param("id") id: string,
  ): Promise<string> {
    return this.todoService.remove(userId, id);
  }
}

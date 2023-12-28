import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Todo } from "./model";
import { TodoDTO } from "./todo.dto";

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async findAll(owner: { owner: string }): Promise<Todo[]> {
    return this.todoModel.find(owner).exec();
  }

  async findOne(data: { _id: string; owner: string }): Promise<Todo> {
    return this.todoModel.findOne(data).exec();
  }

  async create(todo: TodoDTO): Promise<Todo> {
    const createdTodo = await this.todoModel.create(todo);
    return createdTodo;
  }

  async update(owner: string, id: string, todo: Todo): Promise<Todo> {
    return this.todoModel
      .findOneAndUpdate({ _id: id, owner }, todo, { new: true })
      .exec();
  }

  async remove(owner: string, id: string): Promise<string> {
    await this.todoModel.findOneAndDelete({ _id: id, owner }).exec();
    return "Todo deleted successfully";
  }
}

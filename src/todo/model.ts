import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsString, IsNotEmpty } from "class-validator";

@Schema()
export class Todo extends Document {
  @Prop()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Prop()
  @IsString()
  description: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  owner: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

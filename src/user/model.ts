import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

@Schema()
export class User extends Document {
  @Prop()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });

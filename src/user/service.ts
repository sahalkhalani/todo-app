import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./model";
import { UserDTO } from "./user.dto";
import { comparePass, createJwtToken } from "src/helper/authentication";
import messages from "src/helper/messages";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(user: any): Promise<User> {
    const profile = await this.userModel.findOne(user, { password: 0 }).exec();
    return profile;
  }

  async login(user: {
    email: string;
    password: string;
  }): Promise<{ token: string } | { message: string }> {
    const { _id, password: hashedPassword } = await this.userModel
      .findOne({ email: user.email })
      .exec();

    const passwordValidated = await comparePass(user.password, hashedPassword);
    if (passwordValidated) return { token: await createJwtToken(_id) };

    return { message: messages.errorMessages.invalidCreds };
  }

  async create(user: UserDTO): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, user, { new: true, projection: { password: 0 } })
      .exec();
  }

  async remove(id: string): Promise<string> {
    await this.userModel.findByIdAndDelete(id).exec();
    return messages.successMessages.deleted("User account");
  }
}

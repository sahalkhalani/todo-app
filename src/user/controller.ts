import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Request,
  UseGuards,
} from "@nestjs/common";
import { User } from "./model";
import { UserService } from "./service";
import { createJwtToken, hashPassword } from "src/helper/authentication";
import { UserDTO, UserIdDTO } from "./user.dto";
import messages from "src/helper/messages";
import { AuthGuard } from "src/helper/auth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  async signUp(@Body() user: UserDTO): Promise<{ token: string } | string> {
    try {
      const hashedPassword = await hashPassword(user.password);
      const savedUser = await this.userService.create({
        ...user,
        password: hashedPassword,
      });
      const token = await createJwtToken(savedUser.id);
      return { token };
    } catch (e: any) {
      if (e.code === "11000" || e.code === 11000) {
        return messages.errorMessages.alreadyExisting("Email");
      }
      return e.message;
    }
  }

  @Post("/login")
  async login(
    @Body() userInfo: { email: string; password: string },
  ): Promise<{ token: string } | { message: string }> {
    const response = await this.userService.login(userInfo);
    return response;
  }

  @UseGuards(AuthGuard)
  @Get()
  async findOne(@Request() { userId }: UserIdDTO): Promise<User> {
    return this.userService.findOne({ _id: userId });
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @Request() { userId }: UserIdDTO,
    @Body() user: User,
  ): Promise<User> {
    return this.userService.update(userId, user);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async remove(@Request() { userId }: UserIdDTO): Promise<string> {
    return this.userService.remove(userId);
  }
}

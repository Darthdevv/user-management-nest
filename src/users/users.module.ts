import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { UserModel } from "./schemas/user.schema";



@Module({
  imports: [UserModel],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
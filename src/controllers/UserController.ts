import { Controller, Get, Param, Res } from "routing-controllers";
import { UserService } from "../services/UserService";
import { Response } from "express";

@Controller()
export class UserController {
  userService: UserService;

  constructor () {
    this.userService = new UserService();
  }

  @Get('/users/:id')
  async getOne(@Param('id') id:number, @Res() res: Response){
    const user = await this.userService.getUser(id);
    if(!user){
      return res.status(400).send({ message: "일치하는 사용자가 없습니다." });
    }
    return user;
  }

}

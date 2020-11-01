import { Controller, Get, Param } from "routing-controllers";
import userRepository from "../database/repository/userRepository";

@Controller()
export class UserController{

  @Get('/users/:id')
  getOne(@Param('id') id:number){
    return userRepository.getUser(id);
  }
}

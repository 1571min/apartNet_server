import { Body, Controller, Get, JsonController, Post, Res } from "routing-controllers";
import { AuthService } from "../services/AuthService";
import { RegisterUser } from "../dtos/UserDto";
import { Response } from "express";
import { isInstance } from "class-validator";
import { userInfo } from "../database/repository/userRepository";
import User from "../database/entities/User";

@JsonController("/auth")
export class AuthController {
  authService: AuthService;

  constructor () {
    this.authService = new AuthService();
  }

  @Post('/login')
  async login(@Body() body: any,@Res() response: Response){
    const {email, password} = body;
    const result = await this.authService.login(email,password);
    if(result.token){
      return result;
    }else{
      if(result.email){
        return response.status(403).send(result);
      }
      return response.status(404).send(result);
    }
  }
  @Post('/register')
  async register(@Body() registerUser: RegisterUser,@Res() res: Response){
    const chkUser = await this.authService.isExist(registerUser.toEntity());
    if(chkUser){
      return res.status(403).send({message:'이미 존재하는 이메일입니다'});
    }
    const result = await this.authService.register(registerUser.toEntity());
    return result
  }

  @Get('/logout')
  logout(){
    return {
      message: '정상 로그아웃 되었습니다'
    }
  }
}

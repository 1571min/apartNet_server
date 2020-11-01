import userRepository, { userInfo } from "../database/repository/userRepository";
import { getConnection, Repository } from "typeorm";
import User from "../database/entities/User";
import userUtil from "../utils/userUtil";

export class AuthService {
  userRepo: Repository<User>;

  constructor () {
    this.userRepo = getConnection().getRepository('User');
  }

  public async login(email: string, password: string){
    const cryptedPassword = userUtil.cryptoPassword(password);
    const user = await this.userRepo.findOne({
      where:{
        email: email,
      }
    });

    if(user) {
      if(user.password === cryptedPassword){
        const userInfo = {
          email
        }
        const token = userUtil.jwt.sign(userInfo);
        return {
          token
        }
      }else{
        return {
          email,
          message: '비밀번호가 틀렸습니다'
        }
      }
    }
    return {
      message: '이메일이 존재하지 않습니'
    }
  }

  public async register(user: User){
    const cryptedPassword = userUtil.cryptoPassword(user.password);

    const insertUser: userInfo = {
      email: user.email,
      password: cryptedPassword,
      fullName: user.fullName,
      address: user.address
    }
    const result = await this.userRepo.insert(insertUser);
    return result;
  }

  public async isExist(user: User){
    const chkUser = await this.userRepo.findOne({
      where:{
        email:user.email
      }
    });
    return chkUser;
  }
}

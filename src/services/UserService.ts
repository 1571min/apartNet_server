import userRepository from "../database/repository/userRepository";
import { getConnection, Repository } from "typeorm";
import User from "../database/entities/User";

export class UserService {
  userRepo: Repository<User>;

  constructor () {
    this.userRepo = getConnection().getRepository('User');
  }

  public async getUser(id: number){
    return await this.userRepo.findOne({
      where: { id: id },
    });
  }
}

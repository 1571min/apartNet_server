import { getConnection } from 'typeorm';
import User from '../entity/User';
export interface userInfo {
  email: string;
  password: string;
  fullName: string;
  address: string;
}
export default {
  getUser: async (email: string) => {
    const response = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return response;
  },
  insertUser: async (user: userInfo) => {
    const response = await getConnection().getRepository(User).insert(user);
    return response;
  },
};

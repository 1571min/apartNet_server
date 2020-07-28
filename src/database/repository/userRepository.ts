import { getConnection } from 'typeorm';
import User from '../entity/User';
export interface userInfo {
  email: string;
  password: string;
  full_name: string;
  address_name: string;
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

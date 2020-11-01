import { getConnection } from 'typeorm';
import User from '../entities/User';
export interface userInfo {
  email: string;
  password: string;
  fullName: string;
  address: string;
}
export default {
  getUser: async (id: number) => {
    const response = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    return response;
  },
  insertUser: async (user: userInfo) => {
    const response = await getConnection().getRepository(User).insert(user);
    return response;
  },
};

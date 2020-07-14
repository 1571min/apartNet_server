import { getConnection } from 'typeorm';
import User from '../entity/User';

export default {
  getUser: async (email: string, password: string) => {
    const response = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .andWhere('user.password = :password', { password })
      .getOne();
    return response;
  },
};

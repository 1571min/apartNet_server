import userUtil from '../../util/userUtil';
import userRepository from '../../database/repository/userRepository';
import { Express, Request, Response, NextFunction } from 'express';
import { userInfo } from '../../database/repository/userRepository';

export default {
  post: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { email, password, full_name, address_name } = req.body;
      const cryptedPassword = userUtil.cryptoPassword(password);
      const response = await userRepository.getUser(email);
      if (!response) {
        const user: userInfo = {
          email,
          password: cryptedPassword,
          full_name,
          address_name,
        };
        await userRepository.insertUser(user);
        res.status(200).send('ok');
      } else {
        res.status(403).send('email aleady exist');
      }
    } catch (error) {
      res.status(500).send('server error');
    }
  },
};

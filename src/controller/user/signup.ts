import userUtil from '../../util/userUtil';
import userRepository from '../../database/repository/userRepository';
import { Express, Request, Response, NextFunction } from 'express';
import { userInfo } from '../../database/repository/userRepository';
import HttpException from '../../exceptions/HttpException';

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, fullName, address } = req.body;
      const cryptedPassword = userUtil.cryptoPassword(password);
      const response = await userRepository.getUser(email);
      if (!response) {
        const user: userInfo = {
          email,
          password: cryptedPassword,
          fullName,
          address,
        };
        await userRepository.insertUser(user);
        res.status(200).send('ok');
      } else {
        next(new HttpException(403, 'email aleady exist'));
      }
    } catch (error) {
      next(new HttpException(500, error));
    }
  },
};

import userUtil from '../../util/userUtil';
import userRepository from '../../database/repository/userRepository';
import { Express, Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/HttpException';

type SessionRequest = Request & {
  session: Express.Session;
  sessionID: string;
};

export default {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body.inputValue;
      const cryptedPassword = userUtil.cryptoPassword(password);
      const response = await userRepository.getUser(email);

      if (response) {
        if (response.password === cryptedPassword) {
          const userInfo = {
            email,
          };
          const token = userUtil.jwt.sign(userInfo);
          req!.session!.userToken = token;
          res.status(200).json({
            access_token: token,
            token_type: 'JWT',
            expires_in: 4600,
          });
        } else {
          next(new HttpException(403, 'invaild password'));
        }
      } else {
        next(new HttpException(404, 'User not exist'));
      }
    } catch (error) {
      next(new HttpException(500, error));
    }
  },
};

import userUtil from '../../util/userUtil';
import userRepository from '../../database/repository/userRepository';
import { Express, Request, Response, NextFunction } from 'express';

type SessionRequest = Request & {
  session: Express.Session;
  sessionID: string;
};

export default {
  post: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const cryptedPassword = userUtil.cryptoPassword(password);
      const response = await userRepository.getUser(email);

      if (response) {
        if (response.password === cryptedPassword) {
          const userInfo = {
            email,
          };
          const token = userUtil.jwt.sign(userInfo);
          req!.session!.userToken = token;
          res.status(200).send('ok');
        } else {
          res.status(403).send('invaild password');
        }
      } else {
        res.status(404).send('User not exist');
      }
    } catch (error) {
      res.status(500).send('server error');
    }
  },
};

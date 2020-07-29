import userUtil from '../../util/userUtil';
import userRepository from '../../database/repository/userRepository';
import { Express, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtReturn } from '../../util/userUtil';

type SessionRequest = Request & {
  session: Express.Session;
  sessionID: string;
};

export default {
  get: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];
      if (token) {
        const userInfo: jwtReturn = userUtil.jwt.verify(token);
        console.log(userInfo.data.email);
        /**
         * TODO
         * token 인증 미들웨어 작성하기
         * TODO
         * user email을 통한 user 정보 반환해 주기
         */

        res.send('ok');
      } else {
        res.status(404).send('Not found user');
      }
    } catch (error) {
      res.status(500).send('server error');
    }
  },
};

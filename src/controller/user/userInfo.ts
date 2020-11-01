import userUtil from '../../utils/userUtil';
import userRepository from '../../database/repository/userRepository';
import { Express, Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/HttpException';

type SessionRequest = Request & {
  session: Express.Session;
  sessionID: string;
};

/**
 * //TODO
 * token 인증 미들웨어 작성하기
 * TODO//
 * user email을 통한 user 정보 반환해 주기
 */
export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.split(' ')[1];
      const tokenInfo = userUtil.jwt.verify(token);
      const userEmail = tokenInfo.data.email;
      const userInfo = await userRepository.getUser(userEmail);
      if (userInfo) {
        const responseFormat = {
          email: userInfo.email,
          address: userInfo.address,
          fullName: userInfo.fullName,
        };
        res.status(200).json(responseFormat);
      } else {
        res.status(404).send('Not found user');
      }
    } catch (error) {
      next(new HttpException(500, error));
    }
  },
};

import userUtil from '../util/userUtil';
import '../env';
import { Express, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default {
  verifyToken: (req: Request, res: Response, next: NewableFunction) => {
    const token = req!.session!.userToken;
    if (!token) {
      res.status(403).end('Not logged in');
    } else {
      userUtil.jwt.verify(token);
    }
  },
};

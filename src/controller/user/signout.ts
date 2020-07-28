import userUtil from '../../util/userUtil';
import userRepository from '../../database/repository/userRepository';
import { Express, Request, Response, NextFunction } from 'express';

export default {
  get: async (_req: Request, res: Response, _next: NextFunction) => {
    res.status(200).send('ok');
  },
};

import userUtil from '../util/userUtil';
import { Express, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';

export default {
  verifyToken: (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      next(new HttpException(403, 'Not logged in'));
    } else {
      next();
    }
  },
  errorHandler: (
    error: HttpException,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    let status = error.status || 500;
    const message = error.message || 'Server error';
    switch (error.message) {
      case 'jwt expired':
        status = 403;
        response.status(status).send({
          status,
          message,
        });
        break;

      default:
        response.status(status).send({
          status,
          message,
        });
        break;
    }
  },
};

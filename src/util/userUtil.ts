import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

require('dotenv').config();

interface userInfo {
  email: string;
}
export type jwtReturn = {
  exp: number;
  data: userInfo;
  iat: number;
};

export default {
  cryptoPassword: (data: string): any => {
    const shasum = crypto.createHmac('sha512', 'secret');
    shasum.update(data);
    data = shasum.digest('hex');
    return data;
  },
  jwt: {
    sign(payload: userInfo) {
      return jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000 + 30 * 60),
          data: payload,
        },
        'testkey'
      );
    },

    verify(token: string | undefined): string | object | jwtReeturn {
      if (token) {
        return jwt.verify(token, 'testkey');
      } else {
        return {};
      }
    },
  },
};

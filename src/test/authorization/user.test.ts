import request from 'supertest';
import App from '../../app';
import { userFactory } from '../../database/factory/user.factory';
import { getRepository, createConnection, getConnectionOptions } from 'typeorm';
// import config from '../../../ormconfig';
const config = require('../../../ormconfig');
import User from '../../database/entity/User';

const app = new App(5000);
const agent = request(app.app);

describe('User Test', () => {
  // * 팩토리 패턴으로 데이터를 만들고
  // * 데이터를 넣고 지우는 과정을 반복
  beforeAll(async () => {
    const option = await getConnectionOptions();
    Object.assign(option, config);
    const connection = await createConnection(option);
    const user = userFactory.build({
      email: 'test@gmail.com',
      password:
        '39a5f40ccb55541a69f765f40d350ab352e80c6178bce07880684bc5c6b2f98c01d2f98d82cb9730cb3516a10e9b51f169374e9e91d408f4381e38c6601036fb',
    });
    await getRepository(User).save(user);
  });
  afterAll(async () => {
    await getRepository(User).clear();
  });
  describe('POST /user/signin', () => {
    it('should return 200 OK', () => {
      return agent
        .post('/user/signin')
        .send({
          inputValue: { email: 'test@gmail.com', password: '1234' },
        })
        .expect(200);
    });
    it('should return 403', () => {
      return agent
        .post('/user/signin')
        .send({
          inputValue: { email: 'test@gmail.com', password: '1111' },
        })
        .expect(403);
    });

    it('should return 404', () => {
      return agent
        .post('/user/signin')
        .send({
          inputValue: { email: 'test44@gmail.com', password: '1234' },
        })
        .expect(404);
    });
  });
  describe('GET /user/signout', () => {
    it('should return 200 OK', () => {
      return agent.get('/user/signout').expect(200);
    });
  });
  describe('POST /user/signup', () => {
    it('should return 200 OK', () => {
      return agent
        .post('/user/signup')
        .send({
          email: 'test12@gmail.com',
          password: '1234',
          fullName: 'leemintaek',
          address: 'seoul',
        })
        .expect(200);
    });
    it('should return 403 OK', () => {
      return agent
        .post('/user/signup')
        .send({
          email: 'test@gmail.com',
          password: '1234',
          full_name: 'leemintaek',
          address_name: 'seoul',
        })
        .expect(403);
    });
  });
});

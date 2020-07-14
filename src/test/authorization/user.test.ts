import request from 'supertest';
import App from '../../app';
import { expect } from 'chai';

const app = new App(5000);
const agent = request(app.app);

describe('User Test', () => {
  describe('POST /user/signin', () => {
    it('should return 200 OK', () => {
      return agent
        .post('/user/signin')
        .send({
          email: 'test@gmail.com',
          password: '1234',
        })
        .expect(200);
    });
    it('should return 403', () => {
      return agent
        .post('/user/signin')
        .send({
          email: 'test@gmail.com',
          password: '1111',
        })
        .expect(403);
    });

    it('should return 404', () => {
      return agent
        .post('/user/signin')
        .send({
          email: 'test44@gmail.com',
          password: '1234',
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
          email: 'test@gmail.com',
          password: '1234',
          full_name: 'leemintaek',
          address_name: 'seoul',
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

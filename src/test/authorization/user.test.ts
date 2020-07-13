import request from 'supertest';
import App from '../../app';
import { expect } from 'chai';

const app = new App(5000);
const agent = request(app.app);

describe('GET /login', () => {
  it('should return 200 OK', () => {
    return agent.get('/').expect(200);
  });
});

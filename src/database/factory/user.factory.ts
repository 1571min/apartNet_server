import * as Factory from 'factory.ts';
import User from '../entity/User';
User;
export const userFactory = Factory.Sync.makeFactory<User>({
  id: Factory.each((i) => i),
  email: '1234@mail.com',
  password: '1234',
  createdAt: new Date(),
  updatedAt: new Date(),
});

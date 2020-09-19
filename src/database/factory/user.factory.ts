import * as Factory from 'factory.ts';
import User from '../entity/User';
import Apartment from '../entity/Apartment';
import Board from '../entity/Board';
import Comment from '../entity/Comment';
User;

export const userFactory = Factory.Sync.makeFactory<User>({
  id: Factory.each((i) => i),
  email: '1234@mail.com',
  password: '1234',
  address: '서울특별시 강남구 압구정로33길 70 압구정 현대아파트 53동',
  fullName: 'kim',
  apart_id: new Apartment(),
  boards: [new Board()],
  comments: [new Comment()],
  createdAt: new Date(),
  updatedAt: new Date()
});

import * as Factory from 'factory.ts';
import User from '../entities/User';
import Apartment from '../entities/Apartment';
import Board from '../entities/Board';
import Comment from '../entities/Comment';


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

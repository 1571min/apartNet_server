import * as Factory from "factory.ts";
import User from "../entity/User";
import Apartment from "../entity/Apartment";
import Board from "../entity/Board";
import Comment from "../entity/Comment";
User;

export const boardFactory = Factory.Sync.makeFactory<Board>({
  id: Factory.each(i => i),
  name: "TestName",
  content: "this is Test content",
  address: "test address name",
  user: new User(),
  apart: new Apartment(),
  comments: [new Comment()],
  createdAt: new Date(),
  updatedAt: new Date()
});

import * as Factory from "factory.ts";
import User from "../entities/User";
import Apartment from "../entities/Apartment";
import Board from "../entities/Board";
import Comment from "../entities/Comment";
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

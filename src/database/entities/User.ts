/* eslint-disable no-unused-vars */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, OneToMany, ManyToOne,
} from 'typeorm';
import Message from './Message';
import Apartment from './Apartment';
import Board from './Board';
import Comment from './Comment';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  email!: string;

  @Column({ nullable: false })
  password!: string;

  @Column({ nullable: false })
  address!: string;

  @Column({ nullable: false })
  fullName!: string;

  @ManyToOne((_type) => Apartment, (apart) => apart.users, { onDelete: 'CASCADE' })
  apart_id!: Apartment;

  @OneToMany((_type) => Board, (board) => board.user)
  boards!: Board[];

  @OneToMany((_type) => Comment, (comment) => comment.user)
  comments!: Comment[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt!: Date;
}
export default User;

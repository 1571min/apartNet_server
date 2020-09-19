/* eslint-disable no-unused-vars */

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn, OneToMany, ManyToOne,
} from 'typeorm';
import User from './User';
import Board from './Board';

@Entity()
class Comment {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	content!: string;

	@ManyToOne((_type) => User, (user) => user.comments, { onDelete: 'CASCADE' })
	user!: User;

	@ManyToOne((_type) => Board, (board) => board.comments, { onDelete: 'CASCADE' })
	board!: Board;

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
export default Comment;

/* eslint-disable no-unused-vars */

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn, OneToMany, ManyToOne,
} from 'typeorm';
import User from './User';
import Apartment from './Apartment';
import Comment from './Comment';

@Entity()
class Board {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@Column({ nullable: false })
	content!: string;

	@Column({ nullable: false })
	address!: string;

	@ManyToOne((_type) => User, (user) => user.boards, { onDelete: 'CASCADE' })
	user!: User;

	@ManyToOne((_type) => Apartment, (apart) => apart.boards, { onDelete: 'CASCADE' })
	apart!: Apartment;

	@OneToMany((_type) => Comment, (comment) => comment.board)
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
export default Board;

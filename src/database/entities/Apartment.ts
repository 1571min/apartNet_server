/* eslint-disable no-unused-vars */

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn, OneToMany,
} from 'typeorm';
import User from './User';
import Board from './Board';

@Entity()
class Apartment {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@Column({ nullable: false })
	apart_address!: string;

	@OneToMany((_type) => User, (user) => user.apart_id)
	users!: User[];

	@OneToMany((_type) => Board, (board) => board.apart)
	boards!: Board[];

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
export default Apartment;

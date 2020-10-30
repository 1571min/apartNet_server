/* eslint-disable no-unused-vars */

import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn, OneToMany, ManyToMany, OneToOne, JoinColumn,
} from 'typeorm';
import User from './User';

@Entity()
class Message {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ nullable: false })
	name!: string;

	@Column({ nullable: false })
	content!: string;

	@Column({ nullable: false })
	address!: string;

	@OneToOne(_type => User)
	@JoinColumn()
	to!: User;

	@OneToOne(_type => User)
	@JoinColumn()
	from!: User;

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
export default Message;

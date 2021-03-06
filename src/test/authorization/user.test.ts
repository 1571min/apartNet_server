import request from 'supertest';
import {userFactory} from '../../database/factory/user.factory';
import {getRepository} from 'typeorm';
import User from '../../database/entities/User';
import app from "../utils/testApp";
import { createDatabaseTestConnection } from "../utils/database";


const agent = request(app);

describe('User Test', () => {
	// * 팩토리 패턴으로 데이터를 만들고
	// * 데이터를 넣고 지우는 과정을 반복
	beforeAll(async () => {
		await createDatabaseTestConnection();
		const user = userFactory.build({
			email: 'test@gmail.com',
			password:
				'39a5f40ccb55541a69f765f40d350ab352e80c6178bce07880684bc5c6b2f98c01d2f98d82cb9730cb3516a10e9b51f169374e9e91d408f4381e38c6601036fb',
		});
		await getRepository(User).save(user);
	});
	afterAll(async () => {
		await getRepository(User).clear();
	});
	describe('POST /auth/login', () => {
		it('should return 200 OK', async () => {
			const result = await agent
				.post('/auth/login')
				.send(
					 {email: 'test@gmail.com', password: '1234'},
				).expect(200);
		});
		it('should return 403', () => {
			return agent
				.post('/auth/login')
				.send(
					 {email: 'test@gmail.com', password: '1111'},
				)
				.expect(403);
		});

		it('should return 404', () => {
			return agent
				.post('/auth/login')
				.send(
					 {email: 'test44@gmail.com', password: '1234'},
				)
				.expect(404);
		});
	});
	describe('GET /auth/logout', () => {
		it('should return 200 OK', () => {
			return agent.get('/auth/logout').expect(200);
		});
	});
	describe('POST /auth/register', () => {
		it('should return 200 OK', () => {
			return agent
				.post('/auth/register')
				.send({
					email: 'test1222222@gmail.com',
					password: '1234',
					fullName: 'leemintaek22',
					address: 'seoul',
				})
				.expect(200);
		});
		it('should return 403 OK', () => {
			return agent
				.post('/auth/register')
				.send({
					email: 'test@gmail.com',
					password: '1234',
					fullName: 'leemintaek',
					address: 'seoul',
				})
				.expect(403);
		});
	});
	describe('POST /auth/userinfo', () => {
		it('should return 200 OK', async () => {
			const res = await agent.post('/auth/login').send(
				 {email: 'test@gmail.com', password: '1234'},
			);
			const accessToken = res.body.access_token;
			const userInfoRes = await agent
				.get('/users/userinfo')
				.set('Authorization', `Bearer ${accessToken}`);
			return expect(userInfoRes.body).toEqual({
				email: 'test@gmail.com',
				address: '서울특별시 강남구 압구정로33길 70 압구정 현대아파트 53동',
				fullName: 'kim',
			});
		});
		it('should return 403', () => {
			return agent.get('/users/userinfo').set('Authorization', '').expect(403);
		});
	});
});

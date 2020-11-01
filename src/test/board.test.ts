import request from 'supertest';
import App from '../app';
import { createDatabaseConnection } from "../database";

const app = new App(5000);
const agent = request(app.app);

describe('Board Test', () => {
	beforeAll(async () => {
		await createDatabaseConnection();
	});
	afterAll(async () => {
	});
	describe('POST /board', () => {
		it('should return 200 OK', () => {
			return agent
				.post('/board')
				.send({
					name: 'TestName',
					apartmentId: 1,
					content: 'this is Test content',
					tag: ['apart', 'tag'],
					address_name: 'test address name',
					address: 'test address',
				})
				.expect(200);
		});
		it('should return 403', () => {
			return agent
				.post('/board')
				.send({
					apartmentId: 1,
					content: 'this is Test content',
					tag: ['apart', 'tag'],
					address_name: 'test address name',
					address: 'test address',
				})
				.expect(403);
		});
	});
	describe('GET /board', () => {
		it('should return 200 OK', async () => {
			const res = await agent.get('/board');
			return expect(res.body).toEqual([
				{
					name: 'TestName',
					apartmentId: 1,
					content: 'this is Test content',
					tag: ['apart', 'tag'],
					address_name: 'test address name',
					address: 'test address',
				},
			]);
		});
	});
	describe('GET /board/:id', () => {
		it('should return 200 OK', async () => {
			const res = await agent.get('/board/1');
			return expect(res.body).toEqual({
				name: 'TestName',
				apartmentId: 1,
				content: 'this is Test content',
				tag: ['apart', 'tag'],
				address_name: 'test address name',
				address: 'test address',
			});
		});
		it('should return 404', () => {
			return agent.get('/board/10').expect(404);
		});
	});
});

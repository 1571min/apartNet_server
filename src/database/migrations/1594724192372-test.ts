import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { userFactory } from '../factory/user.factory';
import User from '../entity/User';

export class test1594724192372 implements MigrationInterface {
  name = 'test1594724192372';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL DEFAULT '1111', `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    const user = userFactory.build({
      email: 'test@gmail.com',
      password:
        '39a5f40ccb55541a69f765f40d350ab352e80c6178bce07880684bc5c6b2f98c01d2f98d82cb9730cb3516a10e9b51f169374e9e91d408f4381e38c6601036fb',
    });
    await getRepository(User).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user`');
  }
}

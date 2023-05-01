import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../entities/user/user';

export default class UsersSeed implements Seeder {
  constructor(private connection: Connection) {}

  async run(factory: Factory): Promise<void> {
    const users = [
      { name: 'Joaquín Tomas', lastName: 'Polonuer', email: 'joaquin@polonuer.com', password: 'mutantes' },
      { name: 'Roni Ezequiel', lastName: 'Leschinski', email: 'roni@leschinski.com', password: 'mutantes' },
      { name: 'Facundo Ivan', lastName: 'Moreno', email: 'facundo@moreno.com', password: 'mutantes' },

    ];
    const userRepository = this.connection.getRepository(User);
    await userRepository.save(users);
  }
}

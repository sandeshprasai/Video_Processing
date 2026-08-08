import { UserRepositoryPort } from "../../../Core/Auth/Ports/UserRepositoryPort.js";
import { UserMapper } from "../Repositories/Mapper/UserMapper.js";

export class UserRepository extends UserRepositoryPort {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async findByEmail(email) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return UserMapper.toDomain(user);
  }

  async Save(User) {
    const userEntity = UserMapper.toEntity(User);
    const user = await this.prisma.user.upsert({
      where: { email: userEntity.email },
      update: userEntity,
      create: userEntity,
    });

    return UserMapper.toDomain(user);
  }
}

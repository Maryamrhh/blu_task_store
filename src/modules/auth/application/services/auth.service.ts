import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterCommand } from '../commands/register.command';
import { User, UserRole } from '../../domain/models/user.model';
import { EntityManager } from 'typeorm';
import { LoginCommand } from '../commands/login.command';
import { History, HistoryAction, HistoryEntityType } from '../../../../history/history.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly entityManager: EntityManager,
  ) {}

  async register(
    command: RegisterCommand,
  ): Promise<{ token: string; userId: string; role: UserRole }> {
    return this.entityManager.transaction(async (eM) => {
      const hashedPassword = await bcrypt.hash(command.password, 10);
      const newUser = eM.create(User, {
        email: command.email,
        password: hashedPassword,
        role: command.role || UserRole.USER, // default role can be USER, or you can modify this based on your requirements
      });

      const savedUser = await eM.save(newUser);
      await eM.save(History, {
        entityId: savedUser.id,
        entityType: HistoryEntityType.User,
        action: HistoryAction.CREATED,
      })

      // Generate a token for the new user
      const token = this.jwtService.sign({
        id: savedUser.id,
        role: savedUser.role,
      });

      return { token, userId: savedUser.id, role: savedUser.role };
    });
  }

  async login(command: LoginCommand): Promise<{ token: string; userId: string; role: string }> {
    return this.entityManager.transaction(async (eM) => {
      const user = await eM.findOne(User,{
        where: {
          email: command.email
      }});
      if (!user || !(await bcrypt.compare(command.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const token = this.jwtService.sign({ id: user.id, role: user.role });
      return { token, userId: user.id, role: user.role };
    });


  }
}

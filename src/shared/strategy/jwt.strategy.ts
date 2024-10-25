import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../../modules/auth/domain/models/user.model';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EntityManager } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly entityManager: EntityManager) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env['JWT_SECRET'],
    });
  }
  async validate(payload: { id: string; role: string }) {
    return this.entityManager.transaction(async (eM) => {
      const user = await eM.findOne(User, {
        where: {
          id: payload.id,
        },
      });
      return user;
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../presentation/interfaces/jwt-payload.interface';
import { User } from '../../domain/models/user.model';
import { EntityManager, getManager } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(    private readonly entityManager: EntityManager,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret_key',
    });
  }

  async validate(payload: JwtPayload) {
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

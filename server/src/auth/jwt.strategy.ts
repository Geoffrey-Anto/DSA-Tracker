import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          if (req.cookies && req.cookies['access-token']) {
            return req.cookies['access-token'];
          } else {
            const header = req.headers;
            console.log(header);
            if (header.cookie) {
              return header.cookie;
            }
          }
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.id,
      name: payload.name,
      email: payload.email,
      qListId: payload.qListId,
    };
  }
}

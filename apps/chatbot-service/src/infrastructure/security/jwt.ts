import jwt from 'jsonwebtoken';
import { securityConfig } from '../../config/security.config';

export class JwtHelper {
  public static sign(payload: any): string {
    return jwt.sign(payload, securityConfig.jwt.secret, {
      expiresIn: securityConfig.jwt.expiresIn as any,
    });
  }

  public static verify(token: string): any {
    return jwt.verify(token, securityConfig.jwt.secret);
  }
}

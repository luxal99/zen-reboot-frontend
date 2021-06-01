import jwt from 'jwt-decode';
import {User} from '../models/user';
import {TokenBody} from '../models/token-body';

export class JwtUtil {

  static async decode(token: string): Promise<TokenBody | null> {
    try {
      const decoded: TokenBody = await jwt(token);
      return {
        exp: decoded.exp,
        // @ts-ignore
        roles: decoded.roles,
        username: decoded.sub
      };
    } catch (e) {
      return null;
    }
  }
}

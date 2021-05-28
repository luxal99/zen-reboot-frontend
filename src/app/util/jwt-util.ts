import jwt from 'jwt-decode';
import {User} from '../models/user';
import {TokenBody} from '../models/token-body';

export class JwtUtil {

  static async decode(token: string): Promise<User> {
    const decoded: TokenBody = await jwt(token);
    console.log(decoded);
    return {
      roles: decoded.roles,
      username: decoded.sub
    };
  }
}

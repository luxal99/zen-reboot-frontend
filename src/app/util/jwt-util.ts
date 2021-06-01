import jwt from 'jwt-decode';
import {User} from '../models/user';
import {TokenBody} from '../models/token-body';

export class JwtUtil {

  static async decode(token: string): Promise<TokenBody | null> {
    try {
      return await jwt(token);
    } catch (e) {
      return null;
    }
  }
}

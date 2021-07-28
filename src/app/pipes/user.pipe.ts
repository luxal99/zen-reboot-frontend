import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../models/entity/user';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(listOfUsers: User[], searchText: string): User[] {
    if (!listOfUsers) {
      return [];
    }
    if (!searchText) {
      return listOfUsers;
    }

    return listOfUsers.filter((user) => user.username?.toLowerCase().includes(searchText.toLowerCase()));
  }

}

import {Pipe, PipeTransform} from '@angular/core';
import {Client} from '../models/entity/client';

@Pipe({
  name: 'client'
})
export class ClientPipe implements PipeTransform {

  transform(listOfClient: Client[], searchText: string): any {

    if (!listOfClient) {
      return [];
    }
    if (!searchText) {
      return listOfClient;
    }

    return listOfClient.filter((client) =>
      client.person?.firstName?.toLowerCase()?.includes(searchText.toLowerCase()) ||
      client.person?.lastName?.toLowerCase().includes(searchText.toLowerCase()));
  }

}

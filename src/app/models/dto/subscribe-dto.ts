import {Observable} from 'rxjs';
import {GenericService} from '../../service/generic.service';

export interface SubscribeDto {
  subscriber?: Observable<any>;
  service?: GenericService<any>;
  // tslint:disable-next-line:ban-types
  chain?: Function[];
}

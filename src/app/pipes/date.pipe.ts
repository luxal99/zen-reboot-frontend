import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "date"
})
export class DatePipe implements PipeTransform {

  transform(date: string): string {
    return moment(date).format("DD MMMM YYYY");
  }

}

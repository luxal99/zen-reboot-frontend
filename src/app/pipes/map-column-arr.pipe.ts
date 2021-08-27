import {Pipe, PipeTransform} from "@angular/core";
import {Column} from "../models/util/column";

@Pipe({
  name: "mapColumnArr"
})
export class MapColumnArrPipe implements PipeTransform {

  transform(columnArr: Column[]): string[] {
    if (!columnArr) {
      return [];
    }

    return columnArr.map((item) => (item.name));
  }

}

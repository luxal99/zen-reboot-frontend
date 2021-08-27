import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "dynamicProperty"
})
export class DynamicPropertyPipe implements PipeTransform {

  transform(object: any, path: string): any {
    if (!object || !path) {
      return "";
    }

    return path.split(".").reduce((prev, curr) => {
      return prev ? prev[curr] : null;
    }, object);
  }

}

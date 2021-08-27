import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], searchProperty: string | string[], searchText: string): unknown {
    if (searchText === "") {
      return list;
    }
    if (!list) {
      return [];
    }
    if (Array.isArray(searchProperty)) {
      list = list.filter((item) => searchProperty.some((key) =>
        this.getProperty(item, key).toLowerCase().includes(searchText.toLowerCase())));
    } else {
      list = list.filter((item) => this.getProperty(item, searchProperty)
        .toLowerCase().includes(searchText.toLowerCase()));
    }
    return list;
  }

  getProperty(object: any, path: string): string {
    if (!path.includes(".")) {
      return object[path];
    }
    return path.split(".").reduce((prev, curr) => {
      return prev ? prev[curr] : null;
    }, object);
  }
}

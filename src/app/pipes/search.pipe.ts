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
    let filteredArray = [];
    if (Array.isArray(searchProperty)) {
      filteredArray = list.filter((item) => searchProperty.some((key) => this.getProperty(item, key).toLowerCase().includes(searchText.toLowerCase())));
    } else {

      filteredArray = list.filter((item) => this.getProperty(item, searchProperty).toLowerCase().includes(searchText.toLowerCase()));
    }
    console.log(filteredArray);
    return filteredArray;
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

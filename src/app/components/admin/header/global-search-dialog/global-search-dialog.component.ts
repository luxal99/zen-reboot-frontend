import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-global-search-dialog',
  templateUrl: './global-search-dialog.component.html',
  styleUrls: ['./global-search-dialog.component.sass']
})
export class GlobalSearchDialogComponent implements OnInit {

  searchText = '';

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  inputChange(): void {
    if (this.searchText.length === 0) {
      // @ts-ignore
      document.getElementById('search').style.display = 'none';
      // @ts-ignore
      document.getElementById('huge-label').style.display = 'block';
    } else {
      // @ts-ignore
      document.getElementById('search').style.display = 'block';
      // @ts-ignore
      document.getElementById('huge-label').style.display = 'none';

    }
  }

  showSearch(): void {
    // @ts-ignore
    document.getElementById('search').style.display = 'block';
    // @ts-ignore
    document.getElementById('huge-label').style.display = 'none';


  }
}

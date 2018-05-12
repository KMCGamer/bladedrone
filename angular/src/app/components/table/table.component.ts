import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() values: any[];
  @Input() headers: string[];
  @Input() defaultSort: string;

  sortType: string;
  sortReverse: boolean;

  constructor() { }

  ngOnInit() {
    if (this.defaultSort === undefined) {
      this.defaultSort = this.headers[0];
    }
    this.sortType = this.defaultSort;
    this.sortReverse = false;
  }

  public sort(header: string) {
    let sorted;
    if (this.values.length === 0) {
      return;
    }

    // Determine the type
    if (typeof this.values[0][header] === "number") {
      sorted = this.sortNumerically(header);
    } else if (typeof this.values[0][header] === "string") {
      sorted = this.sortAlphabetically(header);
    }

    this.values = this.sortReverse ?  sorted: sorted.reverse(); 
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  private sortAlphabetically(header: string): any[] {
    // Using slice to create a shallow copy
    return this.values.slice(0).sort((a, b) => {
      if (b[header] === a[header]) {
        return this.compareAlphabetically(a[this.defaultSort], b[this.defaultSort]);
      } else {
        return this.compareAlphabetically(a[header], b[header]);
      } 
    });
  }

  private compareAlphabetically(a: string, b: string): number {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }

  private sortNumerically(header: string) {
    // Using slice to create a shallow copy
    return this.values.slice(0).sort((a, b) => {
      if (b[header] === a[header]) {
        return this.compareAlphabetically(a[this.defaultSort], b[this.defaultSort]);
      } else {
        return b[header] - a[header]; 
      }
    });
  }
}

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
  @Input() link: string;

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

  /* Determines the correct sorting method and sorts the values */
  public sort(header: string) {
    let sorted;
    if (this.values.length < 2) {
      return;
    }

    // Determine the type of sorting to do
    if (typeof this.values[0][header] === "number") {
      sorted = this.sortNumerically(header);
    } else if (typeof this.values[0][header] === "string") {
      sorted = this.sortAlphabetically(header);
    }

    this.values = this.sortReverse ?  sorted: sorted.reverse(); 
    this.sortType = header;
    this.sortReverse = !this.sortReverse;
  }

  /* 
  Sorts the values alphabetically. If two values are the same, the values
  are then sorted by their default value. 
  */
  private sortAlphabetically(header: string): any[] {
    // Using slice to create a shallow copy
    return this.values.slice(0).sort((a, b) => {
      if (b[header] === a[header]) {
        return this.compare(a[this.defaultSort], b[this.defaultSort]);
      } else {
        return this.compareAlphabetically(a[header], b[header]);
      } 
    });
  }
  
  /* 
  Sorts the values numerically. If two values are the same, the values
  are then sorted by their default value. 
  */
  private sortNumerically(header: string) {
    // Using slice to create a shallow copy
    return this.values.slice(0).sort((a, b) => {
      if (b[header] === a[header]) {
        return this.compare(a[this.defaultSort], b[this.defaultSort]);
      } else {
        return b[header] - a[header]; 
      }
    });
  }

  /* Compares two values of unknown type. */
  private compare(a: any, b: any): number {
    if (typeof a === "string" && typeof b === "string") {
      return this.compareAlphabetically(a, b);
    } else if (typeof a === "number" && typeof b === "number") {
      return this.compareNumerically(a, b);
    } else {
      return 0;
    }
  }

  /* Compares two values of type: string */
  private compareAlphabetically(a: string, b: string): number {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }

  /* Compares two values of type: number */
  compareNumerically(a: number, b: number): number {
    return a - b;
  }
}

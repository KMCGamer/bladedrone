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
  sortAscending: boolean;

  constructor() { }

  ngOnInit() {
    if (this.defaultSort === undefined) {
      this.defaultSort = this.headers[0];
    }
    // this.sortType = this.defaultSort;
    // this.sortAscending = true;
    // this.sort(this.defaultSort);
  }

  /* Determines the correct sorting method and sorts the values */
  public sort(header: string) {
    // Dont bother sorting if theres less than 2 values
    if (this.values.length <= 1) {
      return;
    }

    // Set back to default if its a different sort
    if (this.sortType !== header) {
      this.sortAscending = true;
    } else {
      this.sortAscending = !this.sortAscending;
    }

    // Sort with the new method.
    switch (typeof this.values[0][header]) {
      case "number":
        this.values.sort((a, b) => {
          if (a[header] === b[header]) {
            return this.sortByDefault(a[this.defaultSort], b[this.defaultSort]);
          }
          return this.sortAscending ? a[header] - b[header] : b[header] - a[header];
        });
        break;
      case "string":
        this.values.sort((a, b) => {
          if (a[header] === b[header]) {
            return this.sortByDefault(a[this.defaultSort], b[this.defaultSort]);
          }
          return this.sortAscending ? a[header].localeCompare(b[header]) : b[header].localeCompare(a[header]);
        })
        break;
      default:
        break;
    }

    this.sortType = header;
  }

  /* Sort by the default value, makes reading the table easier */
  private sortByDefault(a: any, b: any): number {
    if (typeof a === "number") {
      return a - b;
    } else if (typeof a === "string") {
      return a.localeCompare(b);
    }
  }
}
